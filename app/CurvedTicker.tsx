const tickerItems = ['Websites that win attention', 'Software built to scale', 'Digital experiences that convert', 'WEBSTELL'];

function TickerSet() {
 return <div className="curved-ticker-set" aria-hidden="true">
  {[...tickerItems, ...tickerItems].map((item,index)=><span className="curved-ticker-item" key={`${item}-${index}`}>{item}<i>✦</i></span>)}
 </div>;
}

export default function CurvedTicker(){
 return <section className="curved-ticker" aria-label="WEBSTELL — websites, software and digital experiences">
  <span className="sr-only">Websites that win attention. Software built to scale. Digital experiences that convert.</span>
  <div className="curved-ticker-track"><TickerSet/><TickerSet/></div>
 </section>;
}
