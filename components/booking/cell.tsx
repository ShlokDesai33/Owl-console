import Link from "next/link";

export default function BookingCell(props: Props) {
  return (
    <li>
      <Link href={``}>
      </Link>
    </li>
  )
}

// ------------------------------------ //
// types

type Props = {
  // the unique booking id
  id: string
  // user details
  user: {
    id: string;
    name: string;
    image: string;
  };
  customInputs: string[];
  // example 'sample' / 'monthly' / 'per cycle'
  priceMetric: string;
  metricQuantity: number;
  resourceID: string;
  type: 'pending' | 'confirmed' | 'completed' | 'canceled'
}