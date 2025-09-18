
    // Smart Search (name + category + ingredients)
    (function(){
      const input = document.getElementById('searchInput');
      input.addEventListener('input', function(){
        const q = this.value.trim().toLowerCase();
        document.querySelectorAll('.recipe-item').forEach(card=>{
          const name = (card.getAttribute('data-name')||'').toLowerCase();
          const cat  = (card.getAttribute('data-category')||'').toLowerCase();
          const ing  = (card.getAttribute('data-ingredients')||'').toLowerCase();
          const text = name + ' ' + cat + ' ' + ing;
          card.style.display = text.includes(q) ? '' : 'none';
        });
      });
    })();

    // Chart: counts by category (automatically computed from DOM)
    (function(){
      const items = document.querySelectorAll('.recipe-item');
      const counts = {}; // category -> count
      items.forEach(it=>{
        const c = (it.getAttribute('data-category')||'Other').toLowerCase();
        counts[c] = (counts[c]||0) + 1;
      });

      const labels = Object.keys(counts).map(k=>k.charAt(0).toUpperCase()+k.slice(1));
      const data = Object.values(counts);

      const ctx = document.getElementById('recipeChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Recipes per Category',
            data: data,
            backgroundColor: ['#f1c40f','#2ecc71','#e74c3c','#3498db','#9b59b6','#f39c12'],
          }]
        },
        options: {
          responsive:true,
          plugins:{ legend:{ display:false }, tooltip:{ mode:'index' } },
          scales:{
            x:{ ticks:{ color:'#fff' }, grid:{ display:false } },
            y:{ ticks:{ color:'#fff' }, grid:{ color:'#1a1a1a' } }
          }
        }
      });
    })();

    // Accessibility: pause embedded youtube when modal closes
    document.querySelectorAll('.modal').forEach(modal=>{
      modal.addEventListener('hidden.bs.modal', function(){
        const iframes = this.querySelectorAll('iframe');
        iframes.forEach(f=>{
          const src = f.getAttribute('src');
          f.setAttribute('src', src); // resetting stops playback on most browsers
        });
      });
    });
