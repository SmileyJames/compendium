import HowToJoin from "components/how-to-join";

export default {
  title: 'Components/HowToJoin',
  component: HowToJoin,
};

const Template = (props) => (
  <HowToJoin {...props}/>
);

export const HowToJoinStory = Template.bind({});
HowToJoinStory.args = {
	roomCode: "XKGVZ"
};