import './Columns.css'

const COLUMNS = [
    // {
    //     Header: '',
    //     accessor: 'employer_logo',
    //     Cell: ({ value }) => (
    //         <img src={value} alt="" rel="noopener noreferrer" className="table-image" />
    //       ),
    // },
    {
        Header: 'Company',
        accessor: 'employer_name',
        Cell : ({value}) => (<p
        style={{fontWeight: '800'}}>
            {
                value.length > 60 ? value.substring(0, 60) + '...' : value
            }
        </p>
        ),
    },
    {
        Header: 'Job Title',
        accessor: 'job_title',
        Cell : ({value}) => (
            <p>
            {
                value.length > 60 ? value.substring(0, 60) + '...' : value
            }
            </p>
          ),
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
        Cell: ({value}) => (
            <p>
              {new Date(value).toLocaleDateString()}
            </p>
          ),
    },
];

export default COLUMNS;
