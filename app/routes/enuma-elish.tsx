import React, { useEffect, useState } from "react";
import {loadText} from "../utils/markdown-proc.ts";
import { Deck, MarkdownSlideSet , DefaultTemplate} from "spectacle";

import enumaElish from "../data/enuma-elish.md"

import constrainingTheme from "../themes/constraining_theme.js"

export default function EnumaElish() {
  return (
    <Deck theme={constrainingTheme} template={<DefaultTemplate />}>
      <MarkdownSlideSet>{enumaElish}</MarkdownSlideSet>
    </Deck>
  )
}
