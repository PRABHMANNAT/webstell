const tickerCopy='Websites that win attention  ✦  Software built to scale  ✦  Digital experiences that convert  ✦  WEBSTELL  ✦  ';

export default function CurvedTicker(){
 return <section className="curved-ticker" aria-label="WEBSTELL — websites, software and digital experiences">
  <div className="curved-ticker-track">
   <span>{tickerCopy+tickerCopy}</span>
   <span aria-hidden="true">{tickerCopy+tickerCopy}</span>
  </div>
 </section>;
}
