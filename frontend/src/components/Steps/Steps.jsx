import React, { Fragment } from 'react';
import { classNames } from '../../../utils';
import { CheckIcon } from '@heroicons/react/outline';

const steps = ['Contact Information', 'Order Summary', 'Payment', 'Done'];
function Steps({  currentStep }) {
  return (
    <div className="p-5">
      <div className="mx-4 p-4">
        <div className="flex items-center">
          {steps.map((step, i) => {
            const isFirst = i === 0;
            const isLast = i === steps.length - 1;
            const isDone = i <= currentStep-1;
            const isActive = i === currentStep-1;

            return (
              <Fragment key={i}>
                <div
                  className={classNames(
                    isDone ? 'text-gray-600' : 'text-gray-500',
                    'flex items-center relative'
                  )}
                >
                  <div
                    className={classNames(
                      isDone ? 'border-gray-600 bg-gray-600 text-white' : 'border-gray-500',
                      'rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 flex justify-center align-middle'
                    )}
                  >
                    {isDone && !isActive && <CheckIcon />}
                  </div>
                  <div
                    className={classNames(
                      isDone ? 'text-gray-600' : 'text-gray-500',
                      'absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase '
                    )}
                  >
                    {step}
                  </div>
                </div>
                {!isLast && (
                  <div
                    className={classNames(
                      isDone && !isActive
                        ? 'border-gray-600'
                        : 'border-gray-500',
                      'flex-auto border-t-2 transition duration-500 ease-in-out'
                    )}
                  ></div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Steps;
