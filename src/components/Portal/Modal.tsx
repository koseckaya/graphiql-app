import { useTranslation } from 'next-i18next';

const Modal = (props: {
  message: string;
  callBack(): void;
  closeModal(): void;
}) => {
  const { t } = useTranslation('common');
  return (
    <div
      id="popup-modal"
      className="fixed z-50 h-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
    >
      <div className="relative left-1/3 top-40 max-h-full w-full max-w-md">
        <div className="relative rounded-lg bg-gray-600  shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={props.closeModal}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-white dark:text-gray-400">
              {props.message}
            </h3>
            <button
              onClick={props.callBack}
              data-modal-hide="popup-modal"
              type="button"
              className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
            >
              {t('confirm_close_modal')}
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={props.closeModal}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              {t('cancel_close_modal')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
