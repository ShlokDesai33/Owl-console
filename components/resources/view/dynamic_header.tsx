import { Flask, Package, Prohibit, Question, TextAlignJustify, Textbox, Wrench } from "phosphor-react";
import { formatParam } from "../functions";

export default function DynamicHeader({ param }: { param: string }) {
  let icon;

  switch (param) {
    case 'applications':
      icon = <Wrench size={30} color="#2F80ED" />;
      break;

    case 'limitations':
      icon = <Prohibit size={30} color="#2F80ED" />;
      break;

    case 'sample_requirements':
      icon = <Flask size={30} color="#2F80ED" />;
      break;

    case 'shipping_instructions':
      icon = <Package size={30} color="#2F80ED" />;
      break;

    case 'custom_info':
      icon = <TextAlignJustify size={30} color="#2F80ED" />;
      break;

    case 'custom_input':
      icon = <Textbox size={30} color="#2F80ED" />;
      break;

    // add more cases here

    default:
      icon = <Question size={30} className="text-red-500" />;
      break;
  }

  return (
    <div className="flex items-center mb-6 gap-x-2">
      {icon}
      <h4>{formatParam(param)}</h4>
    </div>
  );
}