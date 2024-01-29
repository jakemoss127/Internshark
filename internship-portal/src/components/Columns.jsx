const COLUMNS = [
    {
        Header: 'Company',
        accessor: 'employer_name',
    },
    {
        Header: 'Job Title',
        accessor: 'job_title',
    },
    {
        Header: 'City',
        accessor: 'job_city',
    },
    {
        Header: 'State',
        accessor: 'job_state',
    },
    {
        Header: 'Application',
        accessor: 'job_apply_link',
        Cell: ({ value }) => (
            <a href={value} target="_blank" rel="noopener noreferrer">
              Apply Here
            </a>
          ),
    },
    {   
        Header: 'Date Posted',
        accessor: 'job_posted_at_datetime_utc',
    },
];

export default COLUMNS;
