import Head from 'next/head'
import { Check, CurrencyDollar, Faders, Image, PlusCircle, UserCircle } from 'phosphor-react'
import Layout from '../../../components/layout'
import useSession from '../../../hooks/useSession'
import { NextPageWithLayout } from '../../../typescript/nextpage'
import Spinner from '../../../components/lib/spinner'
import { useRouter } from 'next/router'
import { useState } from 'react'

const CreateResource: NextPageWithLayout = () => {
  const { data }= useSession();
  const [state, setState] = useState<'loading' | 'error' | 'default'>('default');
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  if (!data || state === 'loading') {
    return (
      <>
        <Head>
          <title>Create Resources | Owl Console</title>
        </Head>

        <div className="flex grow place-items-center justify-center">
          <Spinner />
        </div>
      </>
    )
  }

  if (state === 'error') {
    return (
      <>Error</>
    )
  }

  return (
    <>
      <Head>
        <title>Create Resources | Owl Console</title>
      </Head>

      <main className="pt-12 px-12 overflow-y-scroll">
        <form onSubmit={async e => {
          e.preventDefault();
          if (!file) return;
          setState('loading');

          const formData = new FormData(e.target as HTMLFormElement);
          formData.append('imageType', file.type as string);

          const res = await fetch('/api/resources/post', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { 'Content-Type': ' application/json' }
          })

          if (res.ok) {
            const data = await res.json();
  
            Object.defineProperty(file, 'name', {
              writable: true,
              value: data.imageName
            });
  
            fetch(data.url, {
              method: 'PUT',
              body: file,
              headers: {
                'Content-type': file.type,
                'Access-Control-Allow-Origin': '*',
              },
            })
            .then(res => {
              if (res.ok) router.replace(`/dashboard/resources/${data.imageName}`);
              else setState('error'); setFile(null);
            })
            .catch(() => {
              setState('error'); setFile(null);
            })
          }
          else setState('error'); setFile(null);
        }}>
          <div className="bg-gray-bg rounded-xl w-full py-3 px-5">
            <h6 className="text-gray-text">
              Please fill in all feilds. The more information you provide, the better our algorithm ranks this resource!
            </h6>
          </div>

          <div className="flex items-center justify-between mt-6 mb-8">
            <div className="flex items-center gap-x-3">
              <PlusCircle size={30} color="#BE6CFF" />
              <h3 className="font-normal">New Resource</h3>
            </div>

            <a href="/dashboard/support" target="_blank" rel="noreferrer" className="py-1 px-6 border-2 border-secondary rounded-full">
              <h6 className="text-secondary font-medium">Help</h6>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <div className="shadow-post-shadow rounded-xl p-10 h-fit">
                <div className="flex items-center mb-8 gap-x-2">
                  <Faders size={30} color="#2F80ED" />
                  <h4>General</h4>
                </div>

                <input
                  type="text"
                  name="name"
                  placeholder="Resource Name"
                  className="input-field mt-0"
                  maxLength={50}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  required
                />
                
                <input
                  type="text"
                  name="description"
                  placeholder="Resource Description"
                  className="input-field"
                  maxLength={150}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  required
                />

                <input
                  type="text"
                  name="orgId"
                  hidden
                  value={data.orgId}
                  readOnly
                />

                <input
                  type="text"
                  name="orgLogo"
                  hidden
                  value={data.orgLogo}
                  readOnly
                />

                <input
                  type="text"
                  name="orgName"
                  hidden
                  value={data.orgName}
                  readOnly
                />

                <h6 className="text-gray-text mt-4">Select the current status of your resource:</h6>
                <select name="status" className="py-4 px-4 w-full rounded-xl border-gray-btn text-xl border-2 mt-2">
                  <option value="Available">Available</option>
                  <option value="Out of Service">Out of Service</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>

              <div className="shadow-post-shadow rounded-xl p-10 mt-12">
                <div className="flex items-center gap-x-2 mb-6">
                  <UserCircle size={30} color="#2F80ED" />
                  <h4>Admin Details</h4>
                </div>

                <h6 className="text-gray-text mb-3">These details will be given to users looking to rent this resource:</h6>

                <input
                  name="adminName"
                  className="input-field mt-0 bg-gray-bg border-0"
                  defaultValue={data.adminName}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  readOnly
                />

                <input
                  name="adminEmail"
                  className="input-field bg-gray-bg border-0"
                  defaultValue={data.adminEmail}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  readOnly
                />

                <div className="flex gap-x-2 input-field bg-gray-bg border-0">
                  +91
                  <input
                    name="adminCell"
                    className="outline-none bg-transparent"
                    defaultValue={data.adminCell}
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (['Enter', 'NumpadEnter'].includes(e.key)) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div>
            <div className="shadow-post-shadow rounded-xl p-10">
                <div className="flex items-center gap-x-3 mb-6">
                  <Image size={30} color="#2F80ED" />
                  <h4>Resource Image</h4>
                </div>

                <h6 className="text-gray-text mb-4">Please upload an image with dimensions 500x300:</h6>

                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file && file.type.startsWith('image/')) setFile(file);
                    else setFile(null);
                  }}
                  required
                />
              </div>

              <div className="shadow-post-shadow rounded-xl p-10 mt-12">
                <div className="flex items-center mb-6 gap-x-1">
                  <CurrencyDollar size={30} color="#2F80ED" />
                  <h4>Pricing</h4>
                </div>

                <h6 className="text-gray-text">Select a price metric (priced per sample by default):</h6>
                <select name="priceMetric" className="py-4 px-4 w-full rounded-xl border-gray-btn text-xl border-2 mt-2">
                  <option value="sample">Per Sample</option>
                  <option value="hour">Hourly</option>
                </select>

                <input
                  type="number"
                  name="price"
                  placeholder="Price in ₹"
                  className="input-field"
                  maxLength={50}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  required
                />

                <h6 className="text-gray-text mt-5">Price Discounts:</h6>
                <div className="flex gap-x-3 input-field mt-2">
                  %
                  <input
                    type="number"
                    name="facultyDiscount"
                    placeholder="Student and Faculty"
                    className="placeholder:text-gray-text w-full"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (['Enter', 'NumpadEnter'].includes(e.key)) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    required
                  />
                </div>

                <input
                  type="number"
                  name="metricVolumeLimit"
                  placeholder="Maximum number of samples/hours a day"
                  className="input-field"
                  maxLength={50}
                  autoComplete="off"
                  onKeyDown={(e) => {
                    if (['Enter', 'NumpadEnter'].includes(e.key)) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  required
                />
                
                {/* <div className="flex gap-x-3 input-field">
                  %
                  <input
                    type="number"
                    name="academiaDiscount"
                    placeholder="Academia and Educational Institutes"
                    className="placeholder:text-gray-text w-full"
                    autoComplete="off"
                    onKeyDown={(e) => {
                      if (['Enter', 'NumpadEnter'].includes(e.key)) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    required
                  />
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex justify-center my-10">
            <button className="flex items-center px-5 py-2 bg-primary rounded-xl gap-x-2 disabled:bg-gray-btn" 
              type="submit"
              disabled={!file}
            >
              <h5 className="font-medium text-white">Submit</h5>
              <Check size={27} color="white" />
            </button>
          </div>
        </form>
      </main>
    </>
  )
}

// return the Home page wrapped in the Layout component
CreateResource.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
}

export default CreateResource