import React from "react";

import IconButton from "Kanban/components/IconButton";

const stories = {
  title: "Kanban/IconButton",
  component: IconButton,
};

const Template = (args: any) => <IconButton {...args} />;

export const Default: any = Template.bind({});
Default.args = {
  icon: "edit",
};

export const InvalidIcon: any = Template.bind({});
InvalidIcon.args = {
  icon: "wonder",
};

export default stories;
