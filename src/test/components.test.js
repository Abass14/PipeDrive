import HyperLink from "../components/Hyperlink";

import renderer from "react-test-renderer";
import CustomText from "../components/CustomText";
import UserCard from "../components/UserCard";

it('renders hyperlink correctly', () => {
  const tree = renderer
    .create(<HyperLink text={"text"} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders custom text correctly', () => {
  const tree = renderer
    .create(<CustomText>Hello</CustomText>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});