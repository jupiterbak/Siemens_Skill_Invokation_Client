
import ConnectionSelectionFeedbackPolicy from "./ConnectionSelectionFeedbackPolicy"
import DecoratedInputPort from "./figures/DecoratedInputPort"
import DecoratedOutputPort from "./figures/DecoratedOutputPort"
import MarkerFigure from "./marker/MarkerFigure"
import MarkerStateAFigure from "./marker/MarkerStateAFigure"
import MarkerStateBFigure from "./marker/MarkerStateBFigure"

import Connection from "./figures/Connection"
import ProbeFigure from "./figures/ProbeFigure"
import CircuitFigure from "./figures/CircuitFigure"
import ConnectionRouter from "./ConnectionRouter"
import Raft from "./figures/Raft"
import Mousetrap from "mousetrap"
import LabelInplaceEditor from "./LabelInplaceEditor"
import "./util/mousetrap-global"
import "./util/mousetrap-pause"
import inlineSVG from "../lib/inlineSVG"
import hardware from "./hardware"
import skillproxy from "./io/BackendSkills"
import application_log from "./WindowLogger"
import ValueParserValidator from "./util/ValueParserValidator"
let markdownRenderer = require('markdown-it')()
markdownRenderer.use(require("markdown-it-asciimath"));

// Remember old renderer, if overridden, or proxy to default renderer
let defaultRender = markdownRenderer.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

markdownRenderer.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  let aIndex = tokens[idx].attrIndex('target');
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  }
  return defaultRender(tokens, idx, options, env, self);
};

export default {
  ConnectionSelectionFeedbackPolicy,
  hardware,
  DecoratedInputPort,
  DecoratedOutputPort,
  MarkerFigure,
  MarkerStateAFigure,
  MarkerStateBFigure,
  Connection,
  Raft,
  ProbeFigure,
  Mousetrap,
  inlineSVG,
  LabelInplaceEditor,
  ConnectionRouter,
  CircuitFigure,
  skillproxy,
  application_log,
  markdownRenderer,
  ValueParserValidator
}
