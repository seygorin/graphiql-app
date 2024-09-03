interface HistoryItem {
  method: string;
  url: string;
  requestBody?: string;
  headers?: string;
  variables?: string;
  sdlUrl?: string;
}

export const saveToHistory = (requestData: HistoryItem) => {
  const storedHistory = localStorage.getItem('requestHistory');
  let history = storedHistory ? JSON.parse(storedHistory) : [];
  history.push({
    ...requestData,
    id: Date.now().toString(),
    timestamp: Date.now(),
  });
  history = history.slice(-50);
  localStorage.setItem('requestHistory', JSON.stringify(history));
};
