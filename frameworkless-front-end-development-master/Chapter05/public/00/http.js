const setHeaders = (xhr, headers) => {
  Object.entries(headers).forEach((entry) => {
    const [name, value] = entry;

    xhr.setRequestHeader(name, value);
  });
};

const parseResponse = (xhr) => {
  const { status, responseText } = xhr;

  let data;
  if (status !== 204) data = JSON.parse(responseText);
  return { status, data };
};

const request = (params) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 1000; // 1초가 지나면 timeout 시킴
    const { method = "GET", url, headers = {}, body } = params;

    xhr.open(method, url); // 요청 초기화
    setHeaders(xhr, headers);
    xhr.send(JSON.stringify(body)); // 요청을 보냄

    // 상황별 처리
    xhr.onerror = () => reject(new Error("HTTP Error"));
    xhr.ontimeout = () => reject(new Error("Timeout Error"));
    xhr.onload = () => resolve(parseResponse(xhr));
  });
};

const get = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: "GET",
  });

  return response.data;
};

const post = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "POST",
    body,
  });
  return response.data;
};

const put = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "PUT",
    body,
  });
  return response.data;
};

const patch = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "PATCH",
    body,
  });
  return response.data;
};

const deleteRequest = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: "DELETE",
  });
  return response.data;
};

export default { get, post, put, patch, delete: deleteRequest };
