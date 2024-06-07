'use client';
import { useVehicleContext } from '@/state/vehicleContext';

const VehicleError = ({ errorFrom }) => {
  const { state } = useVehicleContext();

  const isError =
    state?.error[errorFrom] !== undefined && state.error[errorFrom].length > 0;
  return (
    <div className={`bg-red-100 p-1 rounded ${!isError ? 'hidden' : ''}`}>
      <span className='text-red-700 font-semibold'>
        {state.error[errorFrom]}
      </span>
    </div>
  );
};

export default VehicleError;
