import sbt._
import Keys._
import sbtrelease.ReleasePlugin.autoImport._
import sbtrelease.ReleasePlugin.autoImport.{ releaseVcs => sbtReleaseVcsSettingKey } // Import with alias to avoid conflicts if any
import ReleaseTransformations._
import scala.util.Try
import scala.sys.process._ // Not strictly needed if only using Vcs helper

object ReleaseHelper {

  // --- SemVer Definition Start ---
  case class SemVer(major: Int, minor: Int, patch: Int) extends Ordered[SemVer] {
    def compare(that: SemVer): Int = {
      if (this.major != that.major) this.major compare that.major
      else if (this.minor != that.minor) this.minor compare that.minor
      else this.patch compare that.patch
    }
    override def toString: String = s"$major.$minor.$patch"
  }

  object SemVer {
    val SemVerRegex = """v?(\d+)\.(\d+)\.(\d+).*""".r // Allow optional 'v' prefix and ignore suffixes

    def fromString(s: String): Option[SemVer] = s match {
      case SemVerRegex(maj, min, pat) =>
        Try(SemVer(maj.toInt, min.toInt, pat.toInt)).toOption
      case _ => None
    }
  }
  // --- SemVer Definition End ---


  // --- Custom Release Step Definition Start ---
  lazy val customTagReleaseBasedOnLast: ReleaseStep = { st: State =>
    val log = st.log
    // Correctly get VCS instance using Project.extract and the releaseVcs setting key
    val vc = Project.extract(st).get(sbtReleaseVcsSettingKey).getOrElse(sys.error("Aborting release. VCS not configured."))

    // Find the latest SemVer tag by running the VCS tag command
    // Note: This assumes Git. A more robust solution might check vc.commandName
    val currentTags = vc.cmd("tag").lineStream_! // Use lineStream_! to get Stream[String] and handle errors
    val latestSemVerTag: Option[(String, SemVer)] = currentTags
      .flatMap { tag: String => SemVer.fromString(tag).map(sv => (tag, sv)) }
      .sortBy { case (_, semver) => semver }(Ordering[SemVer].reverse)
      .headOption

    // Calculate the next patch version tag
    val (currentVersionTag, nextVersionTag) = latestSemVerTag match {
      case Some((tag: String, semver: SemVer)) =>
        log.info(s"Found latest tag: $tag")
        val nextVer = semver.copy(patch = semver.patch + 1)
        val nextTag = s"v${nextVer.toString}" // Assume 'v' prefix for new tags
        (tag, nextTag)
      case None =>
        log.info("No previous SemVer tags found. Defaulting to v0.1.0")
        ("none", "v0.1.0") // Default first tag
    }
    log.info(s"Calculated next tag: $nextVersionTag")

    // Check if the next tag already exists
    if (currentTags.contains(nextVersionTag)) {
      sys.error(s"Tag '$nextVersionTag' already exists. Aborting release!")
    } else {
      log.info(s"Tagging release as '$nextVersionTag'.")
      val releaseVersion = nextVersionTag.stripPrefix("v") // Version for artifacts shouldn't have 'v'
      // Update state with the calculated release version
      val st2 = st.put(ReleaseKeys.versions, (releaseVersion, "unused-next-snapshot-version"))
      val tagMessage = s"Releasing version $releaseVersion"
      // Use the correct Vcs.tag signature: tag(name, comment, sign) and execute it!
      val tagProcess = vc.tag(nextVersionTag, tagMessage, sign = false) // Create the tag builder (Git impl uses -f by default)
      val tagExitCode = tagProcess.! // Execute the command and get exit code
      if (tagExitCode == 0) {
        log.info(s"Tag '$nextVersionTag' created successfully.")
        st2 // Return state with updated version info
      } else {
        sys.error(s"Failed to create tag '$nextVersionTag'. Process exited with code $tagExitCode.")
      }
    }
  }
  // --- Custom Release Step Definition End ---

}
