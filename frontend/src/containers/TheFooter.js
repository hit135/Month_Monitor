import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="http://fscom.kr" target="_blank" rel="noopener noreferrer">Copyright © 2018 FS Co., Ltd. All Rights Reserved.</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
