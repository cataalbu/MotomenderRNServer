export async function getMotorcycles() {
  const response = await fetch('http://192.168.1.211:8080/motorcycle');
  const motorcycles = await response.json();
  return motorcycles;
}

export async function createMotorcycle(motorcycle) {
  const response = await fetch('http://localhost:8080/motorcycle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(motorcycle),
  });
  const motorcycleRes = await response.json();
  return motorcycleRes;
}

export async function updateMotorcycle(motorcycle) {
  const response = await fetch('http://localhost:8080/motorcycle', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(motorcycle),
  });
  const motorcycleRes = await response.json();
  return motorcycleRes;
}

export async function deleteMotorcycle(motorcycleId) {
  const response = await fetch(
    `http://localhost:8080/motorcycle/${motorcycleId}`,
    {
      method: 'DELETE',
    },
  );
  const resMotorcycleId = await response.json();
  return resMotorcycleId;
}
