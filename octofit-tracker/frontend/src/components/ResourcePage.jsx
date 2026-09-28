import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'Not set';
  }
  if (Array.isArray(value)) {
    return value.length ? value.map(formatValue).join(', ') : 'None';
  }
  if (typeof value === 'object') {
    return value.displayName || value.name || value.username || value._id || 'Record';
  }
  if (typeof value === 'string' && /^[a-f\d]{24}$/i.test(value)) {
    return `#${value.slice(-6)}`;
  }
  return String(value);
}

export default function ResourcePage({ resource, title, description, columns }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchCollection(resource, { signal: controller.signal })
      .then(setRecords)
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Unable to load this collection.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [resource, retryCount]);

  return (
    <section className="resource-view" aria-labelledby={`${resource}-heading`}>
      <div className="resource-heading">
        <div className="resource-title-group">
          <p className="eyebrow">OCTOFIT / {resource.toUpperCase()}</p>
          <h1 id={`${resource}-heading`}>{title}</h1>
          <p className="resource-description">{description}</p>
        </div>
        <div className="record-count" aria-label={`${records.length} records`}>
          <span>ENTRIES</span>
          <strong>{loading ? '...' : String(records.length).padStart(2, '0')}</strong>
        </div>
      </div>

      <div className="collection-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-marker" aria-hidden="true" />
            <h2>{title} register</h2>
          </div>
          {!loading && !error && <span className="panel-total">{records.length} total</span>}
        </div>

        {loading && (
          <div className="collection-state" role="status">
            <span className="loading-mark" aria-hidden="true" />
            <span>Loading {title.toLowerCase()}...</span>
          </div>
        )}

        {!loading && error && (
          <div className="collection-state collection-error" role="alert">
            <div>
              <strong>Could not load this collection.</strong>
              <p>{error}</p>
              <small>Check the API connection and cross-origin access, then retry.</small>
            </div>
            <button
              className="retry-button"
              onClick={() => {
                setLoading(true);
                setError('');
                setRetryCount((count) => count + 1);
              }}
              type="button"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && records.length === 0 && (
          <div className="collection-state empty-state">No records to show yet.</div>
        )}

        {!loading && !error && records.length > 0 && (
          <div className="table-responsive">
            <table className="table resource-table">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id || record.id || record.username || record.title || `${resource}-${index}`}>
                    {columns.map((column) => {
                      const value = column.render ? column.render(record) : record[column.key];
                      return <td key={column.key}>{column.render ? value : formatValue(value)}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
