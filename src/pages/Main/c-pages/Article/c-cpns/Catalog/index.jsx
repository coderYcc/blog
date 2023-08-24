import React, { memo } from 'react';
import { CataLogWrapper } from './style';
import { Anchor } from 'antd';
const { Link } = Anchor;
const Catalog = memo((props) => {
  const {cataLog} = props
  return (
    <CataLogWrapper>
      <Anchor>
        <div className='title'>文章目录</div>
        {
          cataLog && cataLog.map((item) => {
            return (
              <Link href={item.href} title={item.title} key={item.href}>
                {
                  item && item.children.map((itm) => {
                    return (
                      <Link href={itm.href} title={itm.title} key={itm.href}/>
                    );
                  })
                }
              </Link>
            )
          })
        }
      </Anchor>
    </CataLogWrapper>
  )
})

export default Catalog