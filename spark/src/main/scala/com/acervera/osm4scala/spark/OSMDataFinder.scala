/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Ángel Cervera Claudio
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

package com.acervera.osm4scala.spark

import java.io.InputStream
import scala.annotation.tailrec

/**
  * `java.io.InputStream` enricher class that adds the `firstBlockIndex` functionality.
  *
  * The idea is that every `BlobHeader`s starts with the same `pattern`. So to be able to find the first `BlobHeader` in
  * a chunk file, we are looking for that `pattern`.
  *
  * Just before every `BlobHeader`, there is a set of 4 bytes that contains the size of the next `BlobHeader`, but of course
  * it is not a fixed value like the `pattern`. It is necessary to keep it in mind to ignore these 4 bytes.
  *
  * So this is the structure of every block that contains data:
  *
  *   1. 4 bytes with header size.
  *   1. 9 bytes with the constant "0x0A, 0x07, OSMData"
  *   1. Rest of the header.
  *   1. Blob containing data.
  *
  * @see [[https://wiki.openstreetmap.org/wiki/PBF_Format OSM PBF Format documentation]]
  *
  */
object OSMDataFinder {
  private val pattern = Array[Byte](0x0A, 0x07, 'O', 'S', 'M', 'D', 'a', 't', 'a')

  /**
    * The length of the Int value before the header block, that specify the size of the header block.
    */
  val HEADER_SIZE_LENGTH = 4

  implicit class InputStreamEnricher(in: InputStream) {

    /**
      * Search the first block in the `in` from the current location in the Stream.
      *
      * Naive search for this first PoC. If it work, let's try with KMP Algorithm
      *
      */
    def firstBlockIndex(): Option[Long] = {

      @tailrec
      def rec(idx: Long, current: Array[Byte]): Option[Long] =
        if (current.sameElements(pattern) && !isFalsePositive()) {
          Some(idx)
        } else {
          in.read() match {
            case -1 => None
            case i => rec(idx + 1, current.drop(1) :+ i.byteValue())
          }
        }

      /**
        * Checks that It's OSMData string and a true block as well.
        * @return
        */
      def isFalsePositive(): Boolean = false // TODO: Needs implementation.

      /**
        * Reads next n bytes from the stream. If are not enough, return None.
        * @param length Length to read.
        * @return Array of bytes with the content, or None if no enough data to fill the buffer.
        */
      def readNBytes(length: Int): Option[Array[Byte]] = {
        val buffer = Array.fill[Byte](length)(0)
        val read = in.read(buffer)
        if (read < length) None else Some(buffer)
      }

      readNBytes(HEADER_SIZE_LENGTH) // Ignore length header.
        .flatMap(_ => readNBytes(pattern.length)) // Take the first possible BlockHeader
        .flatMap(firstPossibleBlock => rec(0, firstPossibleBlock))

    }

  }
}
