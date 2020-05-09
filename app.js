// -------------------
// start config.  change these values before running.
// -------------------

const inputFilename = "input.csv";
const outputFilename = "output.txt";

const speakers = {
	'Rosco speaking': {
		name: 'CHARACTER_ROSCO',
		portrait: 'this.portraitRosco'
	},

	'Apollo speaking': {
		name: 'CHARACTER_APOLLO',
		portrait: 'PortraitManager.GetInstance().portraitMainCharacterNoSubjugator'
	},

	'Teris speaking': {
		name: 'CHARACTER_TERIS',
		portrait: 'this.portraitTeris'
	},

	'Guard speaking': {
		name: 'CHARACTER_GUARD',
		portrait: 'this.portraitGuard'
	}
};

// ------------------
// end config
// ------------------

const fs = require('fs');
const parse = require('csv-parse/lib/sync')

const records = parse(fs.readFileSync(inputFilename), {
	columns: true,
	skip_empty_lines: true
});

if (typeof(records[0]['Dialog keys']) == 'undefined') {
	console.log("Top row needs to say 'Dialog keys', then 'Speaker descriptions', then 'English' (no apostrophes in any).  Missing 'Dialog keys'");
	process.exit(0);
}

if (typeof(records[0]['Speaker descriptions']) == 'undefined') {
	console.log("Top row needs to say 'Dialog keys', then 'Speaker descriptions', then 'English' (no apostrophes in any).  Missing 'Speaker descriptions'");
	process.exit(0);
}

if (typeof(records[0]['English']) == 'undefined') {
	console.log("Top row needs to say 'Dialog keys', then 'Speaker descriptions', then 'English' (no apostrophes in any).  Missing 'English'");
	process.exit(0);
}

var resultString = "";

for (var i = 0; i < records.length; i++) {
	var speakerDescription = records[i]['Speaker descriptions'];
	if (typeof(speakers[speakerDescription]) == 'undefined') {
		console.log("Unknown speaker description '" + speakerDescription + "' in inputString.  Ensure there's a matching key in 'speakers' object in app.js");
		process.exit(1);
	}
	else {
		resultString += "\n";
		resultString += "            Game.instance.SetPortraitImage(" + speakers[speakerDescription].portrait + ");\n";


		resultString += "            Game.instance.ShowMessage(\n";
		resultString += "                I2.Loc.LocalizationManager.GetTranslation(\"" + speakers[speakerDescription].name + "\"),\n";
		resultString += "                I2.Loc.LocalizationManager.GetTranslation(\"" + records[i]['Dialog keys'] + "\") // " + records[i]['English'] + "\n";
		resultString += "            );\n";
		resultString += "            yield return new WaitUntilMessageIsClosed();\n";
	}
}

fs.writeFileSync(outputFilename, resultString);
console.log(resultString + "\n\n");
console.log("Output was also written to " + outputFilename + "\n\n");
