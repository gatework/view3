import Affix from './components/affix.vue'
import Alert from './components/alert.vue'
import Anchor from './components/anchor.vue'
import AnchorLink from './components/anchor-link.vue'
import AutoComplete from './components/auto-complete.vue'
import Avatar from './components/avatar.vue'
import BackTop from './components/back-top.vue'
import Badge from './components/badge.vue'
import Breadcrumb from './components/breadcrumb.vue'
import BreadcrumbItem from './components/breadcrumb-item.vue'
import VButton from './components/button.vue'
import ButtonGroup from './components/button-group.vue'
import Card from './components/card.vue'
import Carousel from './components/carousel.vue'
import CarouselItem from './components/carousel-item.vue'
import Cascader from './components/cascader.vue'
import Cell from './components/cell.vue'
import CellGroup from './components/cell-group.vue'
import CellItem from './components/cell-item.vue'
import Checkbox from './components/checkbox.vue'
import CheckboxGroup from './components/checkbox-group.vue'
import ICircle from './components/circle.vue'
import Col from './components/col.vue'
import Collapse from './components/collapse.vue'
import ColorPicker from './components/color-picker.vue'
import Content from './components/content.vue'
import DatePicker from './components/date-picker/index.js'
import TimePicker from './components/date-picker/picker/time-picker.js'
import Divider from './components/divider.vue'
import Drawer from './components/drawer.vue'
import Dropdown from './components/dropdown.vue'
import DropdownItem from './components/dropdown-item.vue'
import DropdownMenu from './components/dropdown-menu.vue'
import Footer from './components/footer.vue'
import VForm from './components/form.vue'
import FormItem from './components/form-item.vue'
import Header from './components/header.vue'
import Icon from './components/icon.vue'
import VInput from './components/input.vue'
import InputNumber from './components/input-number.vue'
import Layout from './components/layout.vue'
import List from './components/list.vue'
import ListItem from './components/list-item.vue'
import ListItemMeta from './components/list-item-meta.vue'
import LoadingBar from './components/loading-bar.vue'
import Menu from './components/menu.vue'
import MenuGroup from './components/menu-group.vue'
import MenuItem from './components/menu-item.vue'
import Submenu from './components/submenu.vue'
import Modal from './components/modal.vue'
import OptionGroup from './components/option-group.vue'
import VOption from './components/option.vue'
import Page from './components/page.vue'
import Panel from './components/panel.vue'
import TabPane from './components/pane.vue'
import Poptip from './components/poptip.vue'
import Progress from './components/progress.vue'
import Radio from './components/radio.vue'
import RadioGroup from './components/radio-group.vue'
import Rate from './components/rate.vue'
import Row from './components/row.vue'
import Scroll from './components/scroll.vue'
import VSelect from './components/select.vue'
import Sider from './components/sider.vue'
import Slider from './components/slider.vue'
import Spin from './components/spin.vue'
import Split from './components/split.vue'
import Step from './components/step.vue'
import Steps from './components/steps.vue'
import ISwitch from './components/switch.vue'
import VTable from './components/table.vue'
import Tabs from './components/tabs.vue'
import Tag from './components/tag.vue'
import Time from './components/time.vue'
import Timeline from './components/timeline.vue'
import TimelineItem from './components/timeline-item.vue'
import Tooltip from './components/tooltip.vue'
import Transfer from './components/transfer.vue'
import Tree from './components/tree.vue'
import Upload from './components/upload.vue'
import DynamicDialog from './plugins/dynamic-dialog.js'
import DynamicDrawer from './plugins/dynamic-drawer.js'
import DynamicMessage from './plugins/dynamic-message.js'
import DynamicModal from './plugins/dynamic-modal.js'
import DynamicPopover from './plugins/dynamic-popover.js'

const components = [
  Affix,
  Alert,
  Anchor,
  AnchorLink,
  AutoComplete,
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  VButton,
  ButtonGroup,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Cell,
  CellGroup,
  CellItem,
  Checkbox,
  CheckboxGroup,
  ICircle,
  Col,
  Collapse,
  ColorPicker,
  Content,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Footer,
  VForm,
  FormItem,
  Header,
  Icon,
  VInput,
  InputNumber,
  Layout,
  List,
  ListItem,
  ListItemMeta,
  LoadingBar,
  Menu,
  MenuGroup,
  MenuItem,
  Submenu,
  Modal,
  OptionGroup,
  VOption,
  Page,
  Panel,
  TabPane,
  Poptip,
  Progress,
  Radio,
  RadioGroup,
  Rate,
  Row,
  Scroll,
  VSelect,
  Sider,
  Slider,
  Spin,
  Split,
  Step,
  Steps,
  ISwitch,
  VTable,
  Tabs,
  Tag,
  Time,
  Timeline,
  TimelineItem,
  Tooltip,
  Transfer,
  Tree,
  Upload
]

const namedComponents = new Map([
  ['BackTop', BackTop],
  ['Button', VButton],
  ['DatePicker', DatePicker],
  ['Input', VInput],
  ['Option', VOption],
  ['Select', VSelect],
  ['Switch', ISwitch],
  ['Table', VTable],
  ['TimePicker', TimePicker],
  ['VTable', VTable],
  ['i-button', VButton],
  ['i-circle', ICircle],
  ['i-col', Col],
  ['i-switch', ISwitch]
])

const plugins = [
  DynamicDialog,
  DynamicDrawer,
  DynamicMessage,
  DynamicModal,
  DynamicPopover
]

function registerComponent (app, name, component) {
  if (!app.component(name)) app.component(name, component)
}

export {
  Affix,
  Alert,
  Anchor,
  AnchorLink,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  VButton,
  ButtonGroup,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Cell,
  CellGroup,
  CellItem,
  Checkbox,
  CheckboxGroup,
  ICircle,
  Col,
  Collapse,
  ColorPicker,
  Content,
  DatePicker,
  TimePicker,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Footer,
  VForm,
  FormItem,
  Header,
  Icon,
  VInput,
  InputNumber,
  Layout,
  List,
  ListItem,
  ListItemMeta,
  LoadingBar,
  Menu,
  MenuGroup,
  MenuItem,
  Submenu,
  Modal,
  OptionGroup,
  VOption,
  Page,
  Panel,
  TabPane,
  Poptip,
  Progress,
  Radio,
  RadioGroup,
  Rate,
  Row,
  Scroll,
  VSelect,
  Sider,
  Slider,
  Spin,
  Split,
  Step,
  Steps,
  ISwitch,
  VTable,
  Tabs,
  Tag,
  Time,
  Timeline,
  TimelineItem,
  Tooltip,
  Transfer,
  Tree,
  Upload,
  DynamicDialog,
  DynamicDrawer,
  DynamicMessage,
  DynamicModal,
  DynamicPopover
}

export default {
  install (app) {
    components.forEach((component) => {
      if (component.name) registerComponent(app, component.name, component)
    })

    namedComponents.forEach((component, name) => registerComponent(app, name, component))
    plugins.forEach((plugin) => app.use(plugin))
  }
}
