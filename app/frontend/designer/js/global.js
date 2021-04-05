import DecoratedInputPort from "./figure/DecoratedInputPort"
import DecoratedOutputPort from "./figure/DecoratedOutputPort"
import DecoratedLabeledOutputPort from "./figure/DecoratedLabeledOutputPort"
import CircuitFigure from "./figure/CircuitFigure"
import Mousetrap from "mousetrap"
import "./util/mousetrap-global"
import "./util/mousetrap-pause"
import hardware from "./Hardware"
import inlineSVG from "../lib/inlineSVG"
import LabelInplaceEditor from './LabelInplaceEditor'
import skillproxy from "./io/BackendSkills"
import ValueParserValidator from "./util/ValueParserValidator"

export default {
  hardware,
  DecoratedInputPort,
  DecoratedOutputPort,
  DecoratedLabeledOutputPort,
  LabelInplaceEditor,
  Mousetrap,
  CircuitFigure,
  inlineSVG,
  skillproxy,
  ValueParserValidator
}
