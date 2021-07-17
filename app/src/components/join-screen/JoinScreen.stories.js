import JoinScreen from "components/join-screen";

export default {
  title: 'Components/JoinScreen',
  component: JoinScreen,
};

const Template = (props) => (
  <JoinScreen {...props}/>
);

export const JoinScreenStory = Template.bind({});
JoinScreenStory.args = {
	roomCode: "XKGVZ"
};