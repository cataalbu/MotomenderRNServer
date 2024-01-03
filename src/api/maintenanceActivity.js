export async function getMaintenanceActivities() {
  const response = await fetch('http://localhost:8080/maintenanceActivity');
  const maintenanceActivities = await response.json();
  return maintenanceActivities;
}

export async function createMaintenanceActivity(maintenanceActivity) {
  const response = await fetch('http://localhost:8080/maintenanceActivity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(maintenanceActivity),
  });
  const maintenanceActivityRes = await response.json();
  return maintenanceActivityRes;
}

export async function updateMaintenanceActivity(maintenanceActivity) {
  const response = await fetch('http://localhost:8080/maintenanceActivity', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(maintenanceActivity),
  });
  const maintenanceActivityRes = await response.json();
  return maintenanceActivityRes;
}

export async function deleteMaintenanceActivity(maintenanceActivityId) {
  const response = await fetch(
    `http://localhost:8080/maintenanceActivity/${maintenanceActivityId}`,
    {
      method: 'DELETE',
    },
  );
  const resMaintenanceActivityId = await response.json();
  return resMaintenanceActivityId;
}
