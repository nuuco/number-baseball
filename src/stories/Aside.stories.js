import { Aside } from "../components/Aside"

export default {
	title: "Practice/Aside",
	component: Aside,
	argTypes: {
		title: { control: "text" }
	}
}

const Template = (args) => <Aside {...args} />


export const NomalAside = Template.bind({});