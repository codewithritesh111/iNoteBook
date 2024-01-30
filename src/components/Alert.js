import React from 'react'

export default function Alert(probes) {
    const alertF=()=>{
        probes.alertFunc(null)
    }
  return (
    <div style={{height:"50px"}}>
    {probes.alert && <div>
        <div className={`alert alert-${probes.alert.type} alert-dismissible fade show`} role="alert">
            <strong></strong> {probes.alert.message}
            <button type="button" onClick={alertF} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>}
    </div>
  )
}
