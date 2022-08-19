import {Aside} from "../components/Aside"

const mockupData =  [
	"123 ⚾ 1B",
	"345 ⚾ 1S",
	"654 ❌ Out",
  ];

export default {
	title: "Practice/Aside",
	component: Aside,
	argTypes: {
		scoreRecord: [],
		setScoreRecord: () => {}
	}
}

const Template = (args) => <Aside {...args} />


export const NomalAside = Template.bind({});
export const EmptyAside = Template.bind({});

NomalAside.args = {
	scoreRecord: mockupData,
	setScoreRecord: () => {}
}

EmptyAside.args = {
	scoreRecord: [],
	setScoreRecord: () => {}
}

