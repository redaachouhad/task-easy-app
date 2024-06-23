import Link from "next/link";

interface propsType {
  path: string;
  text: string;
  symbol: JSX.Element;
  order?: boolean;
  onClick?: () => void;
}

function OneLink({ path, text, symbol, order = true, onClick }: propsType) {
  return order ? (
    <Link
      href={path}
      className="flex items-center space-x-1 rounded-lg border-white border-2 py-1 px-2 hover:bg-white hover:text-black transition-all duration-300 ease-linear font-medium text-sm"
      onClick={onClick}
    >
      {symbol}
      <span>{text}</span>
    </Link>
  ) : (
    <Link
      href={path}
      className="flex items-center space-x-1 rounded-lg border-white border-2 py-1 px-2 hover:bg-white hover:text-black transition-all duration-300 ease-linear font-medium text-sm"
      onClick={onClick}
    >
      <span>{text}</span>
      {symbol}
    </Link>
  );
}

export default OneLink;
