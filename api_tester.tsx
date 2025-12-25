import React, { useState } from 'react';
import { Send, Copy, Check, Loader2, Trash2, Plus, Save, Clock, Download, Eye, EyeOff } from 'lucide-react';

export default function APITester() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [headers, setHeaders] = useState([{ key: '', value: '', enabled: true }]);
  const [queryParams, setQueryParams] = useState([{ key: '', value: '', enabled: true }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedRequests, setSavedRequests] = useState([]);
  const [requestName, setRequestName] = useState('');
  const [showRawHeaders, setShowRawHeaders] = useState(false);
  const [activeTab, setActiveTab] = useState('body');
  const [responseTab, setResponseTab] = useState('body');

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
  
  const methodColors = {
    GET: 'bg-cyan-500',
    POST: 'bg-blue-500',
    PUT: 'bg-yellow-500',
    PATCH: 'bg-purple-500',
    DELETE: 'bg-red-500',
    HEAD: 'bg-gray-500',
    OPTIONS: 'bg-green-500'
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '', enabled: true }]);
  };

  const removeHeader = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: '', value: '', enabled: true }]);
  };

  const removeQueryParam = (index) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  const updateQueryParam = (index, field, value) => {
    const newParams = [...queryParams];
    newParams[index][field] = value;
    setQueryParams(newParams);
  };

  const buildUrl = () => {
    const enabledParams = queryParams.filter(p => p.enabled && p.key);
    if (enabledParams.length === 0) return url;
    
    const baseUrl = url.split('?')[0];
    const queryString = enabledParams.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&');
    return `${baseUrl}?${queryString}`;
  };

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    
    try {
      const startTime = Date.now();
      
      const headerObj = {};
      headers.forEach(h => {
        if (h.enabled && h.key && h.value) {
          headerObj[h.key] = h.value;
        }
      });

      const options = {
        method,
        headers: headerObj
      };

      if (['POST', 'PUT', 'PATCH'].includes(method) && body.trim()) {
        options.body = body;
        if (!headerObj['Content-Type']) {
          options.headers['Content-Type'] = 'application/json';
        }
      }

      const finalUrl = buildUrl();
      const res = await fetch(finalUrl, options);
      const endTime = Date.now();
      
      const contentType = res.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        time: endTime - startTime,
        size: new Blob([typeof data === 'string' ? data : JSON.stringify(data)]).size,
        data: typeof data === 'string' ? data : JSON.stringify(data, null, 2),
        headers: Object.fromEntries(res.headers.entries())
      });
    } catch (err) {
      setResponse({
        error: true,
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const saveRequest = () => {
    if (!requestName.trim()) {
      alert('Please enter a name for this request');
      return;
    }
    
    const newRequest = {
      name: requestName,
      method,
      url,
      headers,
      queryParams,
      body,
      timestamp: Date.now()
    };
    
    setSavedRequests([...savedRequests, newRequest]);
    setRequestName('');
  };

  const loadRequest = (req) => {
    setMethod(req.method);
    setUrl(req.url);
    setHeaders(req.headers);
    setQueryParams(req.queryParams);
    setBody(req.body);
  };

  const deleteRequest = (index) => {
    setSavedRequests(savedRequests.filter((_, i) => i !== index));
  };

  const copyResponse = () => {
    if (response && !response.error) {
      navigator.clipboard.writeText(response.data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadResponse = () => {
    if (response && !response.error) {
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `response_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-cyan-400';
    if (status >= 300 && status < 400) return 'text-blue-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-pulse">
              API TESTER
            </span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4">Professional API Testing Platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Saved Requests Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg border border-cyan-500/20 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 px-4 py-3">
                <h3 className="font-semibold text-cyan-400">Saved Requests</h3>
              </div>
              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                {savedRequests.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No saved requests</p>
                ) : (
                  savedRequests.map((req, idx) => (
                    <div key={idx} className="bg-gray-800 rounded p-3 border border-gray-700 hover:border-cyan-500/50 transition-all group">
                      <div className="flex items-start justify-between">
                        <button onClick={() => loadRequest(req)} className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${methodColors[req.method]}`}>
                              {req.method}
                            </span>
                            <span className="text-sm font-medium text-gray-200 truncate">{req.name}</span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">{req.url}</p>
                        </button>
                        <button
                          onClick={() => deleteRequest(idx)}
                          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Request Section */}
            <div className="bg-gray-900 rounded-lg border border-cyan-500/20 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 px-6 py-4">
                <h2 className="text-lg font-semibold text-cyan-400">Request Builder</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Save Request */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    placeholder="Request name..."
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-100 placeholder-gray-500"
                  />
                  <button
                    onClick={saveRequest}
                    className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>

                {/* Method and URL */}
                <div className="flex gap-3">
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className={`px-4 py-3 ${methodColors[method]} text-white rounded-lg font-bold cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  >
                    {methods.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://api.example.com/endpoint"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-100 placeholder-gray-500"
                  />
                  
                  <button
                    onClick={handleSend}
                    disabled={loading || !url}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    Send
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-800">
                  {['params', 'headers', 'body'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium transition-all ${
                        activeTab === tab
                          ? 'text-cyan-400 border-b-2 border-cyan-500'
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Query Params Tab */}
                {activeTab === 'params' && (
                  <div className="space-y-2">
                    {queryParams.map((param, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={param.enabled}
                          onChange={(e) => updateQueryParam(idx, 'enabled', e.target.checked)}
                          className="w-4 h-4 accent-cyan-500"
                        />
                        <input
                          type="text"
                          value={param.key}
                          onChange={(e) => updateQueryParam(idx, 'key', e.target.value)}
                          placeholder="Key"
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-500 text-gray-100 placeholder-gray-600"
                        />
                        <input
                          type="text"
                          value={param.value}
                          onChange={(e) => updateQueryParam(idx, 'value', e.target.value)}
                          placeholder="Value"
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-500 text-gray-100 placeholder-gray-600"
                        />
                        <button
                          onClick={() => removeQueryParam(idx)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addQueryParam}
                      className="flex items-center gap-2 px-4 py-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Parameter
                    </button>
                  </div>
                )}

                {/* Headers Tab */}
                {activeTab === 'headers' && (
                  <div className="space-y-2">
                    {headers.map((header, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={header.enabled}
                          onChange={(e) => updateHeader(idx, 'enabled', e.target.checked)}
                          className="w-4 h-4 accent-cyan-500"
                        />
                        <input
                          type="text"
                          value={header.key}
                          onChange={(e) => updateHeader(idx, 'key', e.target.value)}
                          placeholder="Header"
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-500 text-gray-100 placeholder-gray-600"
                        />
                        <input
                          type="text"
                          value={header.value}
                          onChange={(e) => updateHeader(idx, 'value', e.target.value)}
                          placeholder="Value"
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-500 text-gray-100 placeholder-gray-600"
                        />
                        <button
                          onClick={() => removeHeader(idx)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addHeader}
                      className="flex items-center gap-2 px-4 py-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Header
                    </button>
                  </div>
                )}

                {/* Body Tab */}
                {activeTab === 'body' && (
                  <div>
                    {['POST', 'PUT', 'PATCH'].includes(method) ? (
                      <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='{"key": "value"}'
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-gray-100 placeholder-gray-600 font-mono text-sm"
                        rows="10"
                      />
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Body is not applicable for {method} requests
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Response Section */}
            {response && (
              <div className="bg-gray-900 rounded-lg border border-cyan-500/20 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-cyan-400">Response</h2>
                    {!response.error && (
                      <div className="flex gap-2">
                        <button
                          onClick={copyResponse}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-cyan-400" />
                              <span className="text-cyan-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={downloadResponse}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {response.error ? (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                      <p className="text-red-400 font-semibold mb-2">Error</p>
                      <p className="text-red-300 text-sm">{response.message}</p>
                    </div>
                  ) : (
                    <>
                      {/* Status Bar */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div>
                          <span className="text-xs text-gray-500 block mb-1">Status</span>
                          <span className={`font-bold text-lg ${getStatusColor(response.status)}`}>
                            {response.status} {response.statusText}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block mb-1">Time</span>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span className="font-semibold text-cyan-400">{response.time}ms</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block mb-1">Size</span>
                          <span className="font-semibold text-gray-300">{formatBytes(response.size)}</span>
                        </div>
                      </div>

                      {/* Response Tabs */}
                      <div className="flex gap-2 border-b border-gray-800 mb-4">
                        {['body', 'headers'].map(tab => (
                          <button
                            key={tab}
                            onClick={() => setResponseTab(tab)}
                            className={`px-4 py-2 font-medium transition-all ${
                              responseTab === tab
                                ? 'text-cyan-400 border-b-2 border-cyan-500'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        ))}
                      </div>

                      {/* Response Body */}
                      {responseTab === 'body' && (
                        <div className="bg-black rounded-lg p-4 overflow-auto max-h-96 border border-cyan-500/20">
                          <pre className="text-sm text-cyan-400 font-mono whitespace-pre-wrap break-words">
                            {response.data}
                          </pre>
                        </div>
                      )}

                      {/* Response Headers */}
                      {responseTab === 'headers' && (
                        <div className="bg-gray-800 rounded-lg p-4 overflow-auto max-h-96 border border-gray-700">
                          {Object.entries(response.headers).map(([key, value]) => (
                            <div key={key} className="py-2 border-b border-gray-700 last:border-0">
                              <span className="text-cyan-400 font-mono text-sm">{key}: </span>
                              <span className="text-gray-300 text-sm">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Quick Examples */}
            <div className="bg-gray-900 rounded-lg border border-cyan-500/20 p-4">
              <p className="text-sm font-semibold text-gray-400 mb-3">Quick Examples</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setMethod('GET');
                    setUrl('https://jsonplaceholder.typicode.com/posts/1');
                    setHeaders([{ key: '', value: '', enabled: true }]);
                    setQueryParams([{ key: '', value: '', enabled: true }]);
                    setBody('');
                  }}
                  className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-all text-sm"
                >
                  GET Example
                </button>
                <button
                  onClick={() => {
                    setMethod('POST');
                    setUrl('https://jsonplaceholder.typicode.com/posts');
                    setHeaders([{ key: 'Content-Type', value: 'application/json', enabled: true }]);
                    setQueryParams([{ key: '', value: '', enabled: true }]);
                    setBody('{\n  "title": "My Post",\n  "body": "This is a test",\n  "userId": 1\n}');
                    setActiveTab('body');
                  }}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 transition-all text-sm"
                >
                  POST Example
                </button>
                <button
                  onClick={() => {
                    setMethod('GET');
                    setUrl('https://api.github.com/users/github');
                    setHeaders([{ key: 'Accept', value: 'application/vnd.github.v3+json', enabled: true }]);
                    setQueryParams([{ key: '', value: '', enabled: true }]);
                    setBody('');
                  }}
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-lg hover:bg-purple-500/30 transition-all text-sm"
                >
                  GitHub API
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}