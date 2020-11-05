import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "@testing-library/jest-dom/extend-expect";

jest.requireActual("semantic-ui-react");

configure({ adapter: new Adapter() });