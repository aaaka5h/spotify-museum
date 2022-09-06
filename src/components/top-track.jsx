import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { ItemInfo } from './item-info';

export const TopItem = (item) => {
  let [isOpen, setIsOpen] = useState(false);
  const imgSrc = item.album.images[1].url;

  return (
    <>
      <div className="flex justify-center overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex flex-col relative items-center rounded-md text-black text-sm font-medium hover:font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75"
        >
          <Image
            className="rounded-xl grayscale hover:grayscale-0 hover:transition-all"
            src={imgSrc}
            alt={item.name}
            width={125}
            height={125}
          ></Image>
          <span className="max-w-fit">
            {item.name} {item.explicit ? '🅴' : ''}
          </span>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {item.name}
                  </Dialog.Title>
                  <ItemInfo {...item} index={item.idx} />

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:scale-105 active:ring-1 active:ring-black"
                      onClick={() => setIsOpen(false)}
                    >
                      Go back
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
