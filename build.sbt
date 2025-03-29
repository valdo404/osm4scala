/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2021 Ángel Cervera Claudio
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import sbt.Keys._
import sbtrelease.ReleasePlugin.autoImport.ReleaseTransformations._
import sbtrelease.ReleasePlugin.autoImport._

// Dependencies
lazy val scalatestVersion = "3.2.0"
lazy val scalacheckVersion = "1.14.3"
lazy val commonIOVersion = "2.5"
lazy val logbackVersion = "1.1.7"
lazy val scoptVersion = "3.7.1"
lazy val akkaVersion = "2.5.31"
lazy val spark3Version = "3.5.0"
lazy val sparkDefaultVersion = spark3Version

lazy val scala213 = "2.13.16"
lazy val scala212 = "2.12.20"
lazy val scala211 = "2.11.12"
lazy val scalaVersions = Seq(scala213, scala212)
lazy val sparkScalaVersions = Seq(scala212)

lazy val ghpResolverSetting = Def.setting {
  val nexus = "https://maven.pkg.github.com/"
  if (isSnapshot.value) // sbt-dynver sets isSnapshot
    Some("GitHub Packages Snapshots" at nexus + "valdo404/osm4scala")
  else
    Some("GitHub Packages Releases" at nexus + "valdo404/osm4scala")
}

lazy val commonSettings = Seq(
  organization := "com.github.valdo404",
  ThisBuild / dynverSonatypeSnapshots := true, // Ensures SNAPSHOT is appended correctly for dynver
  scalaVersion := scala212,
  crossScalaVersions := scalaVersions,
  organizationHomepage := Some(url("https://github.com/valdo404")),
  licenses += ("MIT", url("https://opensource.org/licenses/MIT")),
  ThisBuild / homepage := Some(
    url(s"https://github.com/valdo404/osm4scala")
  ),
  ThisBuild / scmInfo := Some(
    ScmInfo(
      url("https://github.com/valdo404/osm4scala"),
      "scm:git:git://github.com/valdo404/osm4scala.git",
      "scm:git:ssh://github.com:valdo404/osm4scala.git"
    )
  ),
  ThisBuild / developers := List(
    Developer(
      "angelcervera",
      "Angel Cervera Claudio",
      "angelcervera@silyan.com",
      url("https://www.acervera.com")
    ),
    Developer(
      "valdo404",
      "Valdo404",
      "",
      url("https://github.com/valdo404")
    )
  ),
  libraryDependencies ++= Seq(
    "org.scalatest" %% "scalatest" % scalatestVersion % Test,
    "org.scalacheck" %% "scalacheck" % scalacheckVersion % Test,
    "commons-io" % "commons-io" % commonIOVersion % Test
  ),
  assembly / test := {},
  scalacOptions ++= Seq(
    "-target:jvm-1.8",
    "-encoding",
    "utf8",
    "-deprecation",
    "-unchecked",
    "-Xlint"
  ),
  javacOptions ++= Seq(
    "-Xlint:all",
    "-source",
    "11",
    "-target",
    "11",
    "-parameters"
  ),
  releaseProcess := Seq[ReleaseStep](
    checkSnapshotDependencies,
    inquireVersions,
    runClean,
    runTest,
    tagRelease,
    pushChanges
  )
)

lazy val disablingPublishingSettings =
  Seq(publish / skip := true, publishArtifact := false)

lazy val disablingCoverage = Seq(coverageEnabled := false)

lazy val coverageConfig =
  Seq(coverageMinimum := 80, coverageFailOnMinimum := true)

lazy val exampleSettings = disablingPublishingSettings ++ disablingCoverage

def generateSparkFatShadedModule(sparkVersion: String, sparkPrj: Project): Project =
  Project(
    id = s"osm4scala-spark${sparkVersion.head}-shaded",
    base = file(s"target/osm4scala-spark${sparkVersion.head}-shaded")
  )
    .disablePlugins(AssemblyPlugin)
    .settings(
      commonSettings,
      disablingCoverage,
      name := s"osm4scala-spark${sparkVersion.head}-shaded",
      description := "Spark 3 connector for OpenStreetMap Pbf parser as shaded fat jar.",
      Compile / packageBin := (sparkPrj / Compile/ assembly).value,
      publishTo := ghpResolverSetting.value // Explicitly set publishTo for this module
    )

def generateSparkModule(sparkVersion: String): Project = {

  val baseFolder = if (sparkDefaultVersion == sparkVersion) {
    s"spark"
  } else {
    s"target/spark${sparkVersion.head}"
  }

  def pathFromModule(relativePath: String): String = if (sparkDefaultVersion == sparkVersion) {
    relativePath
  } else {
    s"../../spark/$relativePath"
  }

  Project(id = s"spark${sparkVersion.head}", base = file(baseFolder))
    .enablePlugins(AssemblyPlugin)
    .settings(
      commonSettings,
      Compile / scalaSource       := baseDirectory.value / pathFromModule("src/main/scala"),
      Compile / resourceDirectory := baseDirectory.value / pathFromModule("src/main/resources"),
      Test / scalaSource          := baseDirectory.value / pathFromModule("src/test/scala"),
      Test / resourceDirectory    := baseDirectory.value / pathFromModule("src/test/resources"),
      Test / parallelExecution    := false,
      coverageConfig,
      name := s"osm4scala-spark${sparkVersion.head}",
      description := "Spark 3 connector for OpenStreetMap Pbf parser.",
      libraryDependencies ++= Seq(
        "org.apache.spark" %% "spark-sql" % sparkVersion % Provided
      ),
      assembly / assemblyOption := (assembly / assemblyOption).value.copy(
        includeScala = false,
        cacheUnzip = false,
        cacheOutput = false
      ),
      assembly / assemblyShadeRules := Seq(
        ShadeRule
          .rename("com.google.protobuf.**" -> "shadeproto.@1")
          .inAll
      ),
      publishTo := ghpResolverSetting.value // Explicitly set publishTo for this module
    )
    .dependsOn(core)
}

lazy val spark3 = generateSparkModule(spark3Version)
lazy val spark3FatShaded = generateSparkFatShadedModule(spark3Version, spark3)

def listOfProjects(): Seq[ProjectReference] = {

  val modules: Seq[ProjectReference] = Seq(
    core,
    commonUtilities,
    examplesCounter,
    examplesCounterParallel,
    examplesCounterAkka,
    examplesTagsExtraction,
    examplesPrimitivesExtraction,
    examplesBlocksExtraction,
    examplesTakeN
  )

  val spark3Projects: Seq[ProjectReference] = Seq(
    spark3,
    spark3FatShaded,
    exampleSparkUtilities,
    exampleSparkDocumentation
  )

  val projects = modules ++ spark3Projects

  projects
}

lazy val root = (project in file("."))
  .disablePlugins(AssemblyPlugin)
  .aggregate( listOfProjects(): _*)
  .settings(
    name := "osm4scala-root",
    crossScalaVersions := Nil,
    publish / skip := true,
    releaseCrossBuild := false,
    releaseProcess := Seq[ReleaseStep](
      checkSnapshotDependencies,
      inquireVersions,
      runClean,
      releaseStepCommandAndRemaining("+test"),
      tagRelease,
      pushChanges
    )
  )

ThisBuild / publishMavenStyle := true

ThisBuild / credentials += Credentials(
  "GitHub Package Registry",
  "maven.pkg.github.com",
  "valdo404",
  System.getenv("GITHUB_TOKEN")
)

lazy val core = Project(id = "core", base = file("core"))
  .disablePlugins(AssemblyPlugin)
  .settings(
    commonSettings,
    coverageConfig,
    coverageExcludedPackages := "org.openstreetmap.osmosis.osmbinary.*",
    name := "osm4scala-core",
    description := "Scala OpenStreetMap Pbf 2 parser. Core",
    Compile / PB.targets := Seq(
      scalapb.gen(grpc = false) -> (Compile / sourceManaged).value
    ),
    publishTo := ghpResolverSetting.value // Explicitly set publishTo for this module
  )

// Examples

lazy val commonUtilities = Project(id = "examples-common-utilities", base = file("examples/common-utilities"))
  .disablePlugins(AssemblyPlugin)
  .settings(
    commonSettings,
    exampleSettings,
    publish / skip := true,
    name := "osm4scala-examples-common-utilities",
    description := "Utilities shared by all examples",
    libraryDependencies ++= Seq("com.github.scopt" %% "scopt" % scoptVersion)
  )
  .disablePlugins(AssemblyPlugin)

lazy val examplesCounter =
  Project(id = "examples-counter", base = file("examples/counter"))
    .disablePlugins(AssemblyPlugin)
    .settings(
      commonSettings,
      exampleSettings,
      name := "osm4scala-examples-counter",
      description := "Counter of primitives (Way, Node, Relation or All) using osm4scala"
    )
    .dependsOn(core, commonUtilities)

lazy val examplesCounterParallel = Project(id = "examples-counter-parallel", base = file("examples/counter-parallel"))
  .disablePlugins(AssemblyPlugin)
  .settings(
    commonSettings,
    exampleSettings,
    name := "osm4scala-examples-counter-parallel",
    description := "Counter of primitives (Way, Node, Relation or All) using osm4scala in parallel threads"
  )
  .dependsOn(core, commonUtilities)

lazy val examplesCounterAkka = Project(id = "examples-counter-akka", base = file("examples/counter-akka"))
  .disablePlugins(AssemblyPlugin)
  .settings(
    commonSettings,
    exampleSettings,
    name := "osm4scala-examples-counter-akka",
    description := "Counter of primitives (Way, Node, Relation or All) using osm4scala in parallel with AKKA",
    libraryDependencies ++= Seq(
      "com.typesafe.akka" %% "akka-actor" % akkaVersion
    )
  )
  .dependsOn(core, commonUtilities)

lazy val examplesTagsExtraction = Project(id = "examples-tag-extraction", base = file("examples/tagsextraction"))
  .disablePlugins(AssemblyPlugin)
  .settings(
    commonSettings,
    exampleSettings,
    name := "osm4scala-examples-tags-extraction",
    description := "Extract all unique tags from the selected primitive type (Way, Node, Relation or All) using osm4scala"
  )
  .dependsOn(core, commonUtilities)

lazy val examplesBlocksExtraction = Project(id = "examples-blocks-extraction", base = file("examples/blocksextraction"))
  .disablePlugins(AssemblyPlugin)
  .settings(
    commonSettings,
    exampleSettings,
    name := "osm4scala-examples-blocks-extraction",
    description := "Extract all blocks from the pbf into a folder using osm4scala."
  )
  .dependsOn(core, commonUtilities)

lazy val examplesBlocksWithIdExtraction = Project(id = "examples-blocks-with-id-extraction", base = file("examples/blockswithidextraction"))
  .disablePlugins(AssemblyPlugin)
  .settings(
    commonSettings,
    exampleSettings,
    name := "examples-blocks-with-id-extraction",
    description := "Extract blocks that contains the id from the pbf into a folder using osm4scala."
  )
  .dependsOn(core, commonUtilities)

lazy val examplesTakeN = Project(id = "examples-takeN", base = file("examples/takeN"))
  .disablePlugins(AssemblyPlugin)
  .settings(
    commonSettings,
    exampleSettings,
    name := "osm4scala-examples-takeN",
    description := "Generate a pbf file by taking the first N blocks."
  )
  .dependsOn(core, commonUtilities)

lazy val examplesPrimitivesExtraction =
  Project(id = "examples-primitives-extraction", base = file("examples/primitivesextraction"))
    .disablePlugins(AssemblyPlugin)
    .settings(
      commonSettings,
      exampleSettings,
      name := "osm4scala-examples-primitives-extraction",
      description := "Extract all primitives from the pbf into a folder using osm4scala."
    )
    .dependsOn(core, commonUtilities)



lazy val exampleSparkUtilities = Project(id = "examples-spark-utilities", base = file("examples/spark-utilities"))
  .disablePlugins(AssemblyPlugin)
  .settings(
    commonSettings,
    exampleSettings,
    name := "osm4scala-examples-spark-utilities",
    description := "Example of different utilities using osm4scala and Spark.",
    libraryDependencies ++= Seq(
      "org.apache.spark" %% "spark-sql" % spark3Version % Provided
    )
  )
  .dependsOn(spark3, commonUtilities)


lazy val exampleSparkDocumentation = Project(id = "examples-spark-documentation", base = file("examples/spark-documentation"))
  .disablePlugins(AssemblyPlugin)
  .settings(
    commonSettings,
    exampleSettings,
    name := "osm4scala-examples-spark-documentation",
    description := "Examples used in the documentation.",
    libraryDependencies ++= Seq(
      "org.apache.spark" %% "spark-sql" % spark3Version
    )
  )
  .dependsOn(spark3, commonUtilities)
