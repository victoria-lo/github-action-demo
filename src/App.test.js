import { shallow } from "enzyme";
import App from "./App";
import { AddColorForm, ColorList } from "./App";
import ColorProvider from './ColorProvider';

describe("<App />", () => {
  it("renders App without crashing", () => {
    shallow(<App />);
  });

  it("renders title", () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper.contains(<h1 style={{ textAlign: "center" }}>Color Organizer</h1>)
    ).toEqual(true);
  });

  it("contains AddColorForm", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<AddColorForm />)).toEqual(true);
  });

  it("contains ColorList", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<ColorList />)).toEqual(true);
  });
});

describe("<ColorProvider />", () => {
  it("renders ColorProvider", () => {
    const wrapper = shallow(<ColorProvider/>);
    wrapper.props().value.addColor("Black", "#000");
    expect(wrapper.props().value.colors.length).toEqual(4);
  });

  it("addColor increases color count to 4", () => {
    const wrapper = shallow(<ColorProvider/>);
    wrapper.props().value.addColor("Black", "#000");
    expect(wrapper.props().value.colors.length).toEqual(4);
    //console.log(wrapper.props().value.colors);
  });

  it("removeColor decreases color count to 2", () => {
    const wrapper = shallow(<ColorProvider/>);
    const idToRemove = wrapper.props().value.colors[0].id;
    wrapper.props().value.removeColor(idToRemove);
    expect(wrapper.props().value.colors.length).toEqual(2);
    //console.log(wrapper.props().value.colors);
  });

  it("rateColor changes rating to 0", () => {
    const wrapper = shallow(<ColorProvider/>);
    const idToRate = wrapper.props().value.colors[0].id;
    wrapper.props().value.rateColor(idToRate, 0);
    expect(wrapper.props().value.colors[0].rating).toEqual(0);
    //console.log(wrapper.props().value.colors);
  });

});