import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel, request } from '@umijs/max';
import { Button } from 'antd';

import styles from './index.less';

function downloadFile(blob, fileName) {
  let a = document.createElement('a');
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  a.remove();
  if (blob) {
    console.log("导出成功")
  }
}

const HomePage  = () => {
  const { name } = useModel('global');

  function handleClick() {
    console.log("handleClick")
    request('/api/Win6000/load_win6001_export_req', {
      method: 'POST',
      responseType: 'blob',
      data: {}
    }).then(res => {
      console.log("res", res)
      downloadFile(res, "test.xlsx")
    }, err => {
      console.log("err", err)
    })
  }

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <Button type="primary" onClick={handleClick}>按钮</Button>
      </div>
    </PageContainer>
  );
};

export default HomePage;
