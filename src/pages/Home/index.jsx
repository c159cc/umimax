import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { request, useModel } from '@umijs/max';
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
    console.log('导出成功');
  }
}

const HomePage = () => {
  const { name } = useModel('global');

  function handleClick(name) {
    request(`/api/Win6000/load_${name}_export_req`, {
      method: 'POST',
      responseType: 'blob',
      data: {},
    }).then(
      (res) => {
        console.log('res', res);
        downloadFile(res, `${name}.xlsx`);
      },
      (err) => {
        console.log('err', err);
      },
    );
  }
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <Button type="primary" onClick={() => handleClick('win6001')}>
          win6001导出
        </Button>
        <Button type="primary" onClick={() => handleClick('win6004')}>
          win6004导出
        </Button>
        <Button type="primary" onClick={() => handleClick('win6007')}>
          win6007导出
        </Button>
        <img
          width={'50px'}
          height="50px"
          src="/dmc2Img/2024-09-20-112529-dy.jpg"
          alt=""
        />
      </div>
    </PageContainer>
  );
};

export default HomePage;
