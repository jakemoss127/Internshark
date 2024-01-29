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
        Header: 'Remote',
        accessor: 'job_is_remote',
    },
];

export default COLUMNS;
