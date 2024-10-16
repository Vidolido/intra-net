'use server';

export async function getVehicles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vehicles`);

  if (!res.ok) {
    console.log(res);
    // throw {
    // 	code: 400,
    // 	errorMessage: 'You mustt be logged in to create events.',
    // 	err: res,
    // 	for: 'adminId',
    // 	message: 'Custom error',
    // };
    throw new Error('Failed to get vehicles from db. Reason: ' + res);
  }

  return res.json();
}

export async function getTransactions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get transactions from db. Reason: ' + res);
  }

  return res.json();
}
