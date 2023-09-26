   var age              = document.getElementById('ageinput');
   var gender           = document.getElementById('gender');
   var bmrOutput        = document.getElementById('bmrOutput');
   var UStab            = document.getElementById('UStab');
   var Metrictab        = document.getElementById('Metrictab');
   var Othertab         = document.getElementById('Othertab');
   var UStabform        = document.getElementById('UStabform');
   var MetricUnitsform  = document.getElementById('MetricUnitsform');
   var Othertabform     = document.getElementById('Othertabform');
   var Clear            = document.getElementById('Clear');
   var feet             = document.getElementById('feet');
   var inches           = document.getElementById('inches');
   var weightpounds     = document.getElementById('weightpounds');
   var ageOutput        = document.getElementById('ageOutput');
   var genderOutput     = document.getElementById('genderOutput');
   var height           = document.getElementById('height');
   var weight           = document.getElementById('weight');

   function activateTab(tabElement) {
      const tabs = document.querySelectorAll('.nav-link');
      tabs.forEach(tab => {
         tab.classList.remove('active-tab');
      });
      tabElement.classList.add('active-tab');
   }

   UStab.addEventListener('click', function (event) {
      activateTab(UStab);
      UStabform.classList.remove('hidden');
      MetricUnitsform.classList.add('hidden');
   })
   
   Metrictab.addEventListener('click', function (event) {
      activateTab(Metrictab);
      MetricUnitsform.classList.remove('hidden');
      UStabform.classList.add('hidden');
   })

   Clear.addEventListener('click', function (event) {
      const activeTab = document.querySelector('.active-tab');
      if (activeTab && activeTab.id === 'UStab') {
         document.getElementById('feet').value = 0;
         document.getElementById('inches').value = 0;
         document.getElementById('weightpounds').value = 0;
      }
      if (activeTab && activeTab.id === 'Metrictab') {
         document.getElementById('height').value = 0;
         document.getElementById('weight').value = 0;
      }
      document.getElementById('ageinput').value = '';
      document.getElementById('gender').value = '';
   })

   document.getElementById('BMRform').addEventListener('submit', function (e) {
      e.preventDefault();
      const activeTab = document.querySelector('.active-tab');
      let heightCM;
      let weightKg;
      if (activeTab && activeTab.id === 'UStab') {
         let feetVal = parseFloat(document.getElementById('feet').value);
         let inchesVal = parseFloat(document.getElementById('inches').value);
         let weightPoundsVal = parseFloat(document.getElementById('weightpounds').value);
         document.getElementById('heightOutput').textContent = feetVal + ' feet ' + inchesVal + ' inches '; 
         document.getElementById('weightOutput').textContent = weightPoundsVal + ' pounds ';
         heightCM = (2.54 * inchesVal) + (30.48 * feetVal);
         weightKg = 0.45359237 * weightPoundsVal;
      }
      if (activeTab && activeTab.id === 'Metrictab') {
         heightCM = parseFloat(document.getElementById('height').value);
         weightKg = parseFloat(document.getElementById('weight').value);
         document.getElementById('heightOutput').textContent = heightCM + ' cm';
         document.getElementById('weightOutput').textContent = weightKg + ' kg';
      }
      ageOutput.innerText = age.value;
      genderOutput.innerText = gender.value;
      var ele = document.getElementsByName('resultoutput');
      for (var i = 0; i < ele.length; i++) {
         if (ele[i].checked) {
            if (ele[i].value === 'Kilojoules') {
               Kilojoulesbmrresult(age.value, heightCM, weightKg, gender.value);
            }
            if (ele[i].value === 'Calories') {
               Caloriesbmrresult(age.value, heightCM, weightKg, gender.value);
            }
         }
      }
   });

   function Caloriesbmrresult(age, heightCM, weightKg, gender) {
      var ageinput = parseFloat(age);
      let calories = 0;
      if (gender === 'female') {
         calories = 10 * weightKg + 6.25 * heightCM - 5 * ageinput - 161;
      } else {
         calories = 10 * weightKg + 6.25 * heightCM - 5 * ageinput + 5;
      }
      var bmrOutput = document.getElementById('bmrOutput');
      var formattedBMR = new Intl.NumberFormat().format(Math.round(calories)); // Format the BMR value with commas
      bmrOutput.textContent = formattedBMR + ' Calories/day';
   }

   function Kilojoulesbmrresult(age, heightCM, weightKg, gender) {
      var ageinput = parseFloat(age);
      let kilojoules = 0;
      if (gender === 'female') {
         kilojoules = (10.0 * weightKg + 6.25 * heightCM - 5 * ageinput - 161) * 4.187; // Formula for females
      } else {
         kilojoules = (10.0 * weightKg + 6.25 * heightCM - 5 * ageinput + 5) * 4.187; // Formula for males
      }
      var bmrOutput = document.getElementById('bmrOutput');
      var formattedBMR = new Intl.NumberFormat().format(Math.round(kilojoules)); // Format the BMR value with commas
      bmrOutput.textContent = formattedBMR + ' kJ/day';
   }
