import React, { useEffect, useState } from "react";
import {loadText} from "../utils/markdown-proc.ts";
import { Deck, MarkdownSlideSet } from "spectacle";

import amarnaMd from "../data/amarna.md"

export default function Amarna() {
  const [md, setMd] = useState("");

  console.log("amarna", md);
  console.log(amarnaMd);

  useEffect(() => {
    loadText(amarnaMd, setMd);
    console.log(amarnaMd);
    console.log("md");
  }, [])
  if (amarnaMd === "") {
    return null;
  }
    {/*<MarkdownSlideSet>{md}</MarkdownSlideSet>*/}
  return (
    <Deck>
      <MarkdownSlideSet>{amarnaMd}</MarkdownSlideSet>
    </Deck>
  )
}
