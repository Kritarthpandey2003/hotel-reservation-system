import React from 'react';

const Maintenance = () => {
  const tasks = [
    { id: 'MT-492', room: '310', issue: 'Air Conditioning leak', priority: 'High', status: 'In Progress', reported: 'Oct 24, 09:30 AM', assignedTo: 'Tech Team A' },
    { id: 'MT-493', room: '705', issue: 'Broken shower head', priority: 'Medium', status: 'Open', reported: 'Oct 24, 11:15 AM', assignedTo: 'Plumbing' },
    { id: 'MT-494', room: '202', issue: 'TV remote not working', priority: 'Low', status: 'Open', reported: 'Oct 24, 01:45 PM', assignedTo: 'General' },
    { id: 'MT-495', room: '812', issue: 'Carpet deep clean required', priority: 'Medium', status: 'Resolved', reported: 'Oct 23, 04:00 PM', assignedTo: 'Housekeeping' },
    { id: 'MT-496', room: '1004', issue: 'Window seal broken', priority: 'High', status: 'In Progress', reported: 'Oct 24, 10:00 AM', assignedTo: 'External Contractor' },
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return 'border-red-300 text-red-600';
      case 'In Progress': return 'border-yellow-400 text-yellow-600';
      case 'Resolved': return 'border-green-400 text-green-600';
      default: return 'border-gray-300 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-surface border border-border p-6 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <div>
          <h2 className="text-lg font-bold text-text-main">Maintenance & Housekeeping</h2>
          <p className="text-xs text-text-muted mt-1">Track room repairs, cleaning schedules, and maintenance tickets</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 mr-4">
            <span className="text-[10px] font-bold text-text-muted uppercase">Filter:</span>
            <select className="border border-border rounded px-2 py-1 bg-white outline-none focus:border-primary text-xs">
              <option>All Tasks</option>
              <option>High Priority</option>
              <option>Open Tasks</option>
            </select>
          </div>
          <button className="bg-primary hover:bg-[#319795] text-white text-xs font-bold py-1.5 px-4 rounded transition-colors shadow-sm">
            Create Ticket
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="grid grid-cols-1 gap-3">
          {tasks.map((task) => (
            <div key={task.id} className={`bg-white border-l-4 ${getStatusColor(task.status)} border-y border-r border-y-border border-r-border rounded shadow-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors`}>
              
              <div className="flex items-start gap-4 flex-1">
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-100 rounded flex-shrink-0">
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Room</span>
                  <span className="text-sm font-black text-text-main leading-none">{task.room}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-main">{task.issue}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-text-muted font-medium">{task.id}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="text-[10px] text-text-muted font-medium">Reported: {task.reported}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:w-[300px] justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Assigned To</span>
                  <span className="text-xs font-medium text-text-main">{task.assignedTo}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="px-2 py-1 border border-border bg-white rounded text-[10px] font-bold uppercase tracking-wider text-text-main">
                    {task.status}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
