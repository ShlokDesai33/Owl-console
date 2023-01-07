import Head from "next/head";
import { NextPageWithLayout } from "../../../typescript/nextpage";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/";
import useSWR from "swr";
import useSession from "../../../hooks/useSession";
import { Timestamp } from "firebase/firestore";
import Spinner from "../../../components/lib/spinner";
import { Desktop } from "phosphor-react";
import { useState } from "react";

function parseBookingType(type: string) {
  switch (type) {
    case "visit":
      return "In-Person Visit";
    case "shipment":
      return "Drop off / Parcel shipment of sample";
    default:
      return "";
  }
}

function parseBookingStatus(type: string) {
  switch (type) {
    case "pending":
      return "Pending Approval";
    case "approved":
      return "Confirmed";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return "";
  }
}

function updateBooking(obj: any, setLoading: any) {
  setLoading(true);
  fetch(`/api/bookings/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .finally(() => {
      setLoading(false);
    });
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    // 500 / 404
    if (!res.ok) {
      throw new Error();
    }
    // 200: OK
    return res.json();
  });

const BookingDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  // fetch data
  const { data: user } = useSession();
  const { data, error } = useSWR(
    user
      ? `/api/bookings/${id}?orgID=${user.orgId}&adminID=${user.adminId}`
      : null,
    fetcher
  );

  const [loading, setLoading] = useState(false);

  if (error) return <div>failed to load</div>;
  else if (!data || loading)
    return (
      <>
        <Head>
          <title>Booking Details | Instrumus</title>
        </Head>

        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      </>
    );

  var customFields = <></>;
  var flag = true;

  for (var key in data.customInputs) {
    customFields = (
      <>
        {customFields}
        <div
          className={`bg-${
            flag ? "gray-50" : "white"
          } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
        >
          <dt className="text-sm font-medium text-gray-500">{key}</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {data.customInputs[key]}
          </dd>
        </div>
      </>
    );
    flag = !flag;
  }

  return (
    <>
      <Head>
        <title>Booking @{id}</title>
      </Head>

      <div className="overflow-y-scroll mx-12 pt-12 pb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800 truncate max-w-3xl">
          Booking <span className="text-gray-text">@{id}</span>
        </h1>
        <div className="overflow-hidden bg-white rounded-sm sm:rounded-lg mt-6 border-2">
          <div className="flex justify-between items-center">
            <div className="pl-4 py-5 sm:pl-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                General Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Product and User details.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Product Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {data.product.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Product ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  @{id}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Organization Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {data.user.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Organization ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  @{data.user.id}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-sm sm:rounded-lg mt-6 border-2">
          <div className="flex justify-between items-center">
            <div className="pl-4 py-5 sm:pl-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Booking Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your preferences and requirements.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Total Estimated Cost
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  ₹{data.totalCost}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Number of {data.product.priceMetric}s
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {data.metricQuantity}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Booking Preference
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {parseBookingType(data.type)}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Selected Slot
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {new Timestamp(
                    data.selectedSlot.seconds,
                    data.selectedSlot.nanoseconds
                  )
                    .toDate()
                    .toLocaleDateString()}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {parseBookingStatus(data.status)}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Date of Creation
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {new Timestamp(
                    data.createdAt.seconds,
                    data.createdAt.nanoseconds
                  )
                    .toDate()
                    .toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {data.customInputs.length > 0 && (
          <div className="overflow-hidden bg-white rounded-sm sm:rounded-lg mt-6 border-2">
            <div className="flex justify-between items-center">
              <div className="pl-4 py-5 sm:pl-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Aditional Specifications
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Customizations specified by {data.org.name}.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <dl>{customFields}</dl>
            </div>
          </div>
        )}

        <div className="flex items-center gap-x-2 mt-8">
          <Desktop className="w-7 h-7 text-primary" />
          <h2 className="text-2xl font-medium tracking-tight text-gray-800 truncate max-w-3xl">
            Control Panel
          </h2>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Booking Status
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Change the booking status here.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // update booking status
                  updateBooking({
                    id: data.id,
                    userID: data.user.id,
                    orgID: user?.orgId,
                    adminID: user?.adminId,
                    update: {
                      // @ts-ignore
                      status: e.target.status.value
                    }
                  }, setLoading);
                }}
              >
                <div className="overflow-hidden sm:rounded-md border-2">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option
                          value="pending"
                          selected={data.status === "pending"}
                        >
                          Pending Approval
                        </option>
                        <option
                          value="approved"
                          selected={data.status === "approved"}
                        >
                          Approved
                        </option>
                        <option
                          value="completed"
                          selected={data.status === "completed"}
                        >
                          Completed
                        </option>
                        <option
                          value="cancelled"
                          selected={data.status === "cancelled"}
                        >
                          Cancelled
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Booking Date
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Change the user&apos;s selected slot if necessary.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // update booking date
                  updateBooking({
                    id: data.id,
                    userID: data.user.id,
                    orgID: user?.orgId,
                    adminID: user?.adminId,
                    productID: data.product.id,
                    update: {
                      // @ts-ignore
                      selectedSlot: e.target.date.value
                    }
                  }, setLoading);
                }}
              >
                <div className="overflow-hidden sm:rounded-md border-2">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        defaultValue={
                          new Timestamp(
                            data.selectedSlot.seconds,
                            data.selectedSlot.nanoseconds
                          )
                            .toDate()
                            .toISOString()
                            .split("T")[0]
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Messages
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Send a message to the user (it will be emailed to them).
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  // update booking date
                  fetch('/api/bookings/message', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      productName: data.product.name,
                      userID: data.user.id,
                      adminName: user?.adminName,
                      // @ts-ignore
                      message: e.target.message.value
                    }),
                  })
                    .finally (() => {
                      setLoading(false);
                    });
                }}
              >
                <div className="overflow-hidden sm:rounded-md border-2">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter your Message
                      </label>
                      <input
                        type="text"
                        name="message"
                        id="message"
                        placeholder="Type here.."
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// return the Home page wrapped in the Layout component
BookingDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BookingDetails;
