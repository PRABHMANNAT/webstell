const tickerCopy='Websites that win attention  ✦  Software built to scale  ✦  WEBSTELL  ✦  ';

function TickerRibbon({id}:{id:string}){
 return <svg viewBox="0 0 2200 260" aria-hidden="true" focusable="false">
  <defs><path id={id} d="M-120 132C210 8 480 22 785 126S1370 258 1680 126S2150 16 2370 126"/></defs>
  <use href={'#'+id} className="ticker-band"/>
  <text className="ticker-copy"><textPath href={'#'+id} startOffset="0%">{tickerCopy+tickerCopy+tickerCopy}</textPath></text>
 </svg>;
}

export default function CurvedTicker(){
 return <section className="curved-ticker" aria-label="WEBSTELL — websites, software and digital experiences">
  <div className="curved-ticker-track">
   <TickerRibbon id="webstell-ticker-a"/>
   <TickerRibbon id="webstell-ticker-b"/>
  </div>
 </section>;
}
