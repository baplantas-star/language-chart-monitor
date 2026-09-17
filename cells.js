// Original instructional illustrations of each cell; not WIDA scoring criteria.
const cellGuides = {
 "6-0": {title:"Shape a connected text for an audience",focus:"Look for an organization that serves the purpose, with clear links between ideas and deliberate choices that help the audience follow.",examples:[
 ["Problem → response","Floods repeatedly closed the trail. To keep it accessible, the town raised the lowest section. The next storm will test whether this solution works."],
 ["Claim → concession → response","The raised trail costs more. Although that concern is reasonable, repeated repairs may cost even more over time."],
 ["Audience connection","Imagine losing your only safe route to school after every storm. For nearby families, this is why the trail matters."]
 ]},
 "6-1": {title:"Varied sentence structures",focus:"Look for purposeful variation that makes contrast, cause, condition, and qualification clear—not simply longer sentences.",examples:[
 ["Compound","The water receded, but the damage remained."],
 ["Complex · concession + cause","Although the water receded, residents could not return because the bridge was unsafe."],
 ["Compound-complex","Although the water receded, the bridge remained unsafe, and residents had to find another route."],
 ["Embedded relative clause","The bridge, which engineers had inspected the previous week, collapsed during the flood."],
 ["Conditional relationship","If the supports had been reinforced, the bridge might have survived."]
 ]},
 "6-2": {title:"Choose words for precision and effect",focus:"Look for vocabulary choices that fine-tune a claim, convey intensity, or create a purposeful image.",examples:[
 ["Shades of certainty","The findings suggest a link; they do not establish a cause."],
 ["Shades of intensity","The current did more than disturb the riverbank: it scoured it."],
 ["Metaphor","The wetland is a sponge, absorbing water that would otherwise rush downstream."],
 ["Simile","Without roots to hold it, the soil crumbled like a sandcastle."]
 ]},
 "5-0": {title:"Carry meaning across sentences and paragraphs",focus:"Look for connections that develop a topic across a text, rather than a series of isolated statements.",examples:[
 ["Given → new","The river carries sediment. This sediment accumulates where the current slows."],
 ["Whole → parts","The wetland slows floodwater. Its plants resist the current, and its soil stores water."],
 ["Paragraph opener · extension","Beyond protecting homes, wetlands also provide habitats for wildlife."],
 ["Paragraph opener · contrast","Despite these benefits, restoring a wetland can be expensive."]
 ]},
 "5-1": {title:"Vary how clauses are combined",focus:"Look for deliberate changes in clause placement and combination to emphasize a reason, contrast, or other relationship.",examples:[
 ["Compound · contrast","The rain stopped, but the river continued to rise."],
 ["Complex · cause first","Because the ground was saturated, more water flowed into the river."],
 ["Complex · result first","More water flowed into the river because the ground was saturated."],
 ["Relative clause","The trees that lined the bank helped hold the soil in place."]
 ]},
 "5-2": {title:"Express stance, possibility, and necessity",focus:"Look for language that adjusts the strength of a claim or communicates a judgment appropriate to the evidence.",examples:[
 ["Modal · possibility","The barrier might reduce flooding during smaller storms."],
 ["Modal · necessity","The design must allow fish to move upstream."],
 ["Hedging","These results suggest that vegetation may reduce erosion."],
 ["Evaluation","The strongest evidence comes from repeated measurements at the same site."]
 ]},
 "4-0": {title:"Connect ideas without repeating everything",focus:"Look for shortened references and balanced grammatical patterns that connect related ideas within or across sentences.",examples:[
 ["Substitution","The first barrier failed. We need a stronger one."],
 ["Ellipsis","One group measured the depth; the other, the width. (‘Measured’ is understood in the second clause.)"],
 ["Parallelism · within a sentence","We must protect the banks, restore the wetlands, and reduce the runoff."],
 ["Parallelism · across sentences","We measured to understand. We compared to explain. We revised to improve."]
 ]},
 "4-1": {title:"Control compound and complex sentences",focus:"Look for increasingly clear clause connections across several structures, with each relationship understandable.",examples:[
 ["Compound · coordination","The current slowed, and sediment settled on the bottom."],
 ["Complex · cause","Sediment settled because the current slowed."],
 ["Complex · time","When the current slowed, sediment began to settle."],
 ["Complex · contrast","Although the surface looked calm, the current below remained strong."]
 ]},
 "4-2": {title:"Name ideas and specify circumstances",focus:"Look for abstract nouns that name concepts and adverbials that add clear information about when, how, or where.",examples:[
 ["Abstract noun · process","Erosion changed the shape of the bank."],
 ["Abstract noun · quality","The accuracy of our measurements improved."],
 ["Adverbial · when","After the storm, we measured the river again."],
 ["Adverbial · how and where","Water moved rapidly through the narrow channel."]
 ]},
 "3-0": {title:"Build connections with related words and patterns",focus:"Look for a connected explanation or account using related vocabulary and repeated phrase structures.",examples:[
 ["Synonyms","The storm damaged the trail. The path remained closed for a week."],
 ["Parallel phrases","We observed the water, measured the depth, and recorded the results."],
 ["Parallel expressions across sentences","The first site had muddy water. The second site had clear water."]
 ]},
 "3-1": {title:"Combine simple ideas and begin to vary sentences",focus:"Look for complete simple sentences alongside early combinations of independent clauses.",examples:[
 ["Simple","The river rose overnight."],
 ["Compound · addition","The river rose, and the trail flooded."],
 ["Compound · contrast","The water was shallow, but the current was strong."],
 ["Varied opening","Near the bridge, the current moved faster."]
 ]},
 "3-2": {title:"Use familiar word combinations appropriately",focus:"Look for combinations and expressions that fit the meaning and situation, rather than word-by-word substitutions.",examples:[
 ["Collocation","We collected data and drew a conclusion."],
 ["Collocation","Heavy rain caused severe flooding."],
 ["Idiomatic expression","The failed trial was a wake-up call: we needed a stronger design."],
 ["Idiomatic expression","After comparing our explanations, we were on the same page."]
 ]},
 "2-0": {title:"Organize ideas and make references clear",focus:"Look for a basic sequence or explanation with words that connect ideas and refer back to what was mentioned.",examples:[
 ["Basic organization","We tested two samples. The first was clear. The second was cloudy."],
 ["Demonstrative","The water turned brown. This change happened after the storm."],
 ["Pronoun","The students collected water. They tested it in class."],
 ["Conjunction","The water rose, so the trail closed."]
 ]},
 "2-1": {title:"Add a dependent clause to a simple message",focus:"Look for mostly simple sentences, with occasional clauses that add a reason, time, or condition.",examples:[
 ["Simple","The trail closed."],
 ["Reason clause","The trail closed because the river flooded."],
 ["Time clause","When the rain stopped, we went outside."],
 ["Condition clause","If the water rises, we will move the equipment."]
 ]},
 "2-2": {title:"Use subject-specific words to express concepts",focus:"Look for technical vocabulary used meaningfully within an explanation—not just listed or copied.",examples:[
 ["Science","Erosion carried soil from the riverbank."],
 ["Mathematics","The denominator shows how many equal parts make one whole."],
 ["Social studies","The tributary joins the main river near the settlement."],
 ["Language arts","The narrator describes the flood from a child's perspective."]
 ]},
 "1-0": {title:"Link ideas into a simple sequence",focus:"Look for ordered ideas held together by repeated key words and straightforward transitions.",examples:[
 ["Sequencing","First we filled the cup. Next we marked the water level."],
 ["Repetition","The water entered the soil. The water stayed in the soil."],
 ["Transition · time","The rain stopped. Then we went outside."],
 ["Transition · result","The water rose. So we moved our bags."]
 ]},
 "1-1": {title:"Use simple sentences with early variation",focus:"Look for complete independent clauses, with some change in sentence openings or patterns. A simple sentence can contain detailed information.",examples:[
 ["Simple · subject + verb","The river rose."],
 ["Simple · added detail","The muddy river flooded the lower trail."],
 ["Different opening","Near the bridge, the water moved quickly."],
 ["Question pattern","Did the water reach the road?"]
 ]},
 "1-2": {title:"Use a word's meaning to fit the context",focus:"Look for a familiar word used with the meaning required by the subject or task.",examples:[
 ["Bank","The river bank was muddy. / The bank approved a loan."],
 ["Table","Record the results in the table. / Put the notebook on the table."],
 ["Root","The roots absorb water. / The square root of 49 is 7."]
 ]}
};
