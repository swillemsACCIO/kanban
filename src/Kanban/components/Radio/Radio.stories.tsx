import React from "react";

import Radio from "Kanban/components/Radio";
import { RecordColor } from "Kanban/enums";

const stories = {
  title: "Kanban/Radio",
  component: Radio,
};

const Template = (args: any) => <Radio {...args} />;

export const Default: any = Template.bind({});
Default.args = {};

export const Color: any = Template.bind({});
Color.args = {
  color: RecordColor.Green,
};

export default stories;
