import Layout from "./layout";
import PeriodButton from "./PeriodButton";

function SearchByPeriod() {
  const days = [1, 3, 7];
  const months = [1, 3, 6, 12];

  return (
    <Layout title="기간별 검색">
      <div className="flex gap-3">
        {days.map((e) => (
          <PeriodButton
            key={`${e} days`}
            value={`${e}일`}
            period={`${e}days`}
          />
        ))}
        {months.map((e) => (
          <PeriodButton
            key={`${e} months`}
            value={`${e}개월`}
            period={`{e}months`}
          />
        ))}
      </div>
    </Layout>
  );
}

export default SearchByPeriod;
