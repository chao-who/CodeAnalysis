/**
 * 分支概览代码统计详情
 */
import React, { useState } from 'react';
import { Radio, Row, Col } from 'coding-oa-uikit';
import get from 'lodash/get';

// 项目内
import s from '../style.scss';
import { t } from '@src/i18n/i18next';
import { getClocLineChartData, getClocPieChartData } from '../utils';
import Line from '@src/components/charts/line';
import DataPie from '@src/components/charts/data-pie';
import NoData from '../no-data';

export const CLOC_TYPE = {
  TOTAL: 'total',
  CODE: 'code',
  COMMENT: 'comment',
  BLANK: 'blank',
};

export const CLOC_TYPE_TXT = {
  TOTAL: t('总数'),
  CODE: t('代码'),
  COMMENT: t('注释'),
  BLANK: t('空白'),
};

const CLOC_TYPE_OPTIONS = [
  { label: CLOC_TYPE_TXT.TOTAL, value: CLOC_TYPE.TOTAL },
  { label: CLOC_TYPE_TXT.CODE, value: CLOC_TYPE.CODE },
  { label: CLOC_TYPE_TXT.COMMENT, value: CLOC_TYPE.COMMENT },
  { label: CLOC_TYPE_TXT.BLANK, value: CLOC_TYPE.BLANK },
];

interface IProps {
  clocScans: Array<any>;
}

const CodeCloc = ({ clocScans }: IProps) => {
  const [typeValue, setTypeValue] = useState(CLOC_TYPE.TOTAL);
  const lineChartDatas = getClocLineChartData(clocScans);
  // 获取当前类型的line数据
  const clocLineData = get(lineChartDatas, typeValue, []);
  // 获取饼图数据
  const clocPieData = getClocPieChartData(clocScans);

  return (
    <div className={s.item}>
      <p className={s.header}>
        <span className={s.tit}>{t('代码统计详情')}</span>
      </p>
      <div className={s.content}>
        <Row gutter={[40, 14]}>
          <Col span={12}>{t('代码分布')}</Col>
          <Col span={12}>{t('代码量趋势')}</Col>
          <Col span={12} style={{ height: '222px' }}>
            {clocPieData.length > 0 ? (
              <DataPie data={clocPieData} />
            ) : (
                <NoData style={{ marginTop: '76px' }} />
            )}
          </Col>
          <Col span={12} className={s.borderLeft} style={{ height: '222px' }}>
            <Radio.Group
              value={typeValue}
              size="small"
              onChange={e => setTypeValue(e.target.value)}
            >
              {CLOC_TYPE_OPTIONS.map(item => (
                <Radio.Button key={item.value} value={item.value}>
                  {item.label}
                </Radio.Button>
              ))}
            </Radio.Group>
            {clocLineData.length > 0 ? (
              <Line
                data={clocLineData}
                xAxisKey="date"
                yAxisKey="num"
                cols={{
                  date: {
                    range: [0, 1],
                    tickCount: 5,
                  },
                }}
                padding={[10, 'auto', 100, 'auto']}
              />
            ) : (
                <NoData style={{ marginTop: '52px' }} />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CodeCloc;
