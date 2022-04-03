import {
  CheckCircleIcon,
  ExclamationCircleIcon
} from "@heroicons/react/outline";

const styles = {
  success: {
    mainBg: "bg-green-50",
    icon: (
      // eslint-disable-next-line react/react-in-jsx-scope
      <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
    ),
    text: "text-green-800",
    btn: "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600"
  },

  error: {
    mainBg: "bg-red-50",
    icon: (
      // eslint-disable-next-line react/react-in-jsx-scope
      <ExclamationCircleIcon
        className="h-5 w-5 text-red-400"
        aria-hidden="true"
      />
    ),
    text: "text-red-800",
    btn: "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600"
  }
};

export default styles;
