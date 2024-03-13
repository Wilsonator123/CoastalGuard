# Notes to consider

## What sort of information do we have available from emails?
- In the subject we get the status:
(INCIDENCE, ATTENDANCE REQUEST, Incident Summary, INCIDENT: UPDATE, Please Stand Down)
- There is a GIN (Guard Incident Number) that is unique to each incident in every subject message
### The body of the message contains:
#### For initial message
- Team
- Type
- Date created (Time) Fri, 09 Feb 2024 15:14 UTC
- RV (Rendezvous)
- Location
- Message Sent (Time) Fri, 09 Feb 2024 15:14 UTC

#### For summary on response
- GIN number
- Team
- Zone
- Reported date & time
- open date (day dd/mm/yyyy)
- Who is the casualty 
- Type of incident 
- Location
- RV

#### Update
- Team
- Type
- Date created (Time) Fri, 09 Feb 2024 15:14 UTC
- RV
- Loc
- Sent (Time) Fri, 09 Feb 2024 15:14 UTC

#### Stand down
- Not relevant

## What do we want to do with this information?
### Do we want to store this information in a database or a file?

### <ins>Relevant data</ins>
- GIN number - Can be used to identify individual cases 
- Status - Active/Inactive
- Time of creation - Can be used to identify the time of the incident
- Last Update
- Location - Can we get a map
- RV - Can we get a map
- Casualty 
- Type of incident
- Notes?


## Website information 



## JSON 

```json
{
    "GIN": "1234",
    "Status": "Active",
    "Team": "ABCDEFG",
    "Type of incident": "MEDIVAC",
    "Location": "Latitude: 51.5074, Longitude: 0.1278",
    "RV": "Latitude: 51.5074, Longitude: 0.1278",
    "Time of creation": "Fri, 09 Feb 2024 15:14 UTC",
    "Last Update": "",
    "Casualty": "John Doe",
    "Notes": ""
    "Updates": [
        {
            "Team": "ABCDEFG",
            "Type": "MEDIVAC",
            "Date created": "Fri, 09 Feb 2024 15:14 UTC",
            "RV": "Latitude: 51.5074, Longitude: 0.1278",
            "Loc": "Latitude: 51.5074, Longitude: 0.1278",
            "Sent": "Fri, 09 Feb 2024 15:14 UTC",
            "Notes": ""
        }
    ]
}