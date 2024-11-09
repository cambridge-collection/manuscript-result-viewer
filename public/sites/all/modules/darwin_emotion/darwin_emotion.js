/**
 * Config & Namespace
 * -----------------------------------------------------------------------------
 */
var darwin = {}
darwin.config = {}

// in application paths
darwin.config.dataPath = 'data/'

/* We need a fix for this but I'm not sure how to get the right path from within jquery */
//darwin.config.imagePath = '/wp-content/plugins/emotions/images/';
darwin.config.imagePath = '/sites/all/modules/darwin_emotion/images/'
darwin.config.saveDataFile = 'savedData.json'
darwin.config.videoPath = 'http://video.darwin.lib.cam.ac.uk/xmoov_mws.php/'
darwin.config.saveDataFilePath =
  darwin.config.dataPath + darwin.config.saveDataFile

// services
darwin.config.servicePath = '/wp-content/plugins/emotions/data/services/'
darwin.config.configPath = darwin.config.servicePath + '_config_util.php'
darwin.config.saveServiceDataPath =
  '/wp-content/plugins/emotions/data/answers/saveData.php'
darwin.config.writeResults =
  '/wp-content/plugins/emotions/data/answers/writeData.php'

// slashes (server setting)
darwin.config.addSlashes = false

/*******************/

var darwinquestiondata = {
  questions: [
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 1',
      image_url: '1.png',
      thumb_url: '1_thumb.png',
      info: "<table summary='DAR 186 27'> <tr> <th></th> <th>Hensleighs</th> <th>Blyth</th> <th>Trimen</th> <th>Horace</th> <th>Mrs Lushington</th> <th>Mr. L.</th> <th>Mr Farrar</th> <th>Henslow</th> </tr><tr> <th>Laughter</th> <td>Yes, yes, yes </td> <td>No</td> <td>Yes</td> <td>Yes</td> <td>Amusement</td> <td>Trying to laugh</td> <td>Laugh</td> <td>Yes</td> </tr> </table><table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Laughter</th> <td>Amusement</td> <td>Pleasure</td> <td></td> <td>Laughing</td> <td>Laughter</td> <td>Laughter</td> <td>Grinning smile</td> <td>Laughter</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Laughter</th> <td>Intense amusement</td> <td>Laughter</td> <td>Wicked joke</td> <td>Bewilderment</td> <td>Amusement</td> <td>Half-laughing and half amazed</td> <td>Pain</td> <td></td> </tr> </table> ",
      darwin_choice: 'Laughter',
      letters_url: '',
      darwin:
        "<div class='darwinSaid'><h3>What Darwin said:</h3><p><i>Expression</i>, pp. 203–4:<br><br>Dr. Duchenne has given a large photograph of an old man (reduced on Plate III. fig 4), in his usual passive condition, and another of the same man (fig. 5), naturally smiling. The latter was instantly recognised by every one to whom it was shown as true to nature. He has also given, as an example of an unnatural or false smile, another photograph (fig. 6) of the same old man, with the corners of his mouth strongly retracted by the galvanization of the great zygomatic muscles. That the expression is not natural is clear, for I showed this photograph to twenty-four persons, of whom three could not in the least tell what was meant, whilst the others, though they perceived that the expression was of the nature of a smile, answered in such words as 'a wicked joke,' 'trying to laugh,' 'grinning laughter,' 'half-amazed laughter,' &c. <br/><br/>Darwin used this photograph in Expression (Plate III, Fig 6).  On the back of the original plate he wrote 'Laughter'</p></div>",
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3><p>Destinée à montrer, chez le meme sujet, que la combinaison du muscle de la joie et de la douleur, à un certain degree de contraction, est inexpressive ou ne produit qu’une grimace. Contraction électrique forte des grands zygomatiques et des sourciliers: grimace.<br/><br/></p><p>[Intended to show, in the same subject, that the combination of the muscle of joy and sadness, to a certain degree of contraction, is inexpressive or produces only a grimace. A strong electric contraction of the zygomatici majores and the corrugatores suppercillii: <i>grimace</i>.]<br/><br/></p><p>Figure 34 in Duchenne 1862, Chapter VI <i>Muscles de la joie et de la bienveillance</i> (Muscles of joy and benevolence)</p></div>",
      averagetime: '4',
      video: '',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p1.jpg',
    },
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 2',
      image_url: 'DAR.LIB.T.160.OUTSIZE_56.png',
      thumb_url: 'DAR.LIB.T.160.OUTSIZE_56_thumb.png',
      info: "<table summary='DAR 186 27'> <tr> <th></th> <th>Hensleighs</th> <th>Blyth</th> <th>Trimen</th> <th>Horace</th> <th>Mrs Lushington</th> <th>Mr. L.</th> <th>Mr Farrar</th> <th>Henslow</th> </tr> <tr> <th>Astonishment</th> <td>Yes, yes, yes</td> <td>Yes</td> <td>No</td> <td>Yes</td> <td>Disgust &amp; wonder</td> <td>Stupid wonder</td> <td>Fearful astonishment</td> <td>Surprise &amp; horror</td> </tr> </table> <table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Astonishment</th> <td>Surprise</td> <td>Surprise</td> <td></td> <td>Surprise Astonishment</td> <td>Pain &amp; wonder</td> <td>Stupid wonder</td> <td>[Sleepy smi] <i>deleted</i></td> <td>Wonder</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Astonishment</th> <td>Woeful astonishment</td> <td>Surprise</td> <td>Surprise</td> <td>Astonishment</td> <td>Surprise</td> <td>Terror</td> <td>Surprise</td> <td>Astonishment</td> </tr> </table> ",
      darwin_choice: 'Surprise',
      letters_url: '',
      darwin:
        "<div class='darwinSaid'><h3>What Darwin said:</h3><p><i>Expression</i>, p. 279:<br><br>This figure expresses surprise with much truth. I showed it to twenty-four persons without a word of explanation, and one alone did not at all understand what was intended. A second person answered terror, which is not far wrong; some of the others, however, added to the words surprise or astonishment, the epithets horrified, woeful, painful, or disgusted.<br/><br/>Darwin wrote on the back of the original plate 'Surprise'</p></div>",
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3>Destinée à létude de la contraction combinée, à un degré modéré, <i>du frontal et des abaisseurs du maxillaire inférieur</i>.<br/><br/>[Intended as a study of the combined contraction, to a moderate degree, of the <i>frontal</i> and the <i>depressors of the  mandible</i>.]<br/><br/>Figure 56 in Duchenne 1862, Chapter X, <i>Muscle complémentaire de la surprise</i> (Complementary muscle of surprise)</p></div>",
      averagetime: '7',
      video:
        'http://video.darwin.lib.cam.ac.uk/xmoov_mws.php/1101301S1Vsurprised_1.flv',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p2.jpg',
    },
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 3',
      image_url: 'DAR.LIB.T.160.OUTSIZE_61.png',
      thumb_url: 'DAR.LIB.T.160.OUTSIZE_61_thumb.png',
      info: "<table summary='DAR 186 27'> <tr> <th></th> <th>Hensleighs</th> <th>Blyth</th> <th>Trimen</th> <th>Horace</th> <th>Mrs Lushington</th> <th>Mr. L.</th> <th>Mr Farrar</th> <th>Henslow</th> </tr> <tr> <th>Fright</th> <td>Yes, no, yes</td> <td>Yes</td> <td>Fright</td> <td>Yes</td> <td>Pain</td> <td>Horror</td> <td>Pain &amp; disgust</td> <td>Terror &amp; horror</td> </tr> </table> <table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Fright</th> <td>Horror</td> <td>Horror</td> <td></td> <td>Scared</td> <td>Pain</td> <td>Abject terror</td> <td>Horror</td> <td>Horror</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Fright</th> <td>Horror</td> <td>Terror</td> <td>Extreme horror, Fright</td> <td>Terror</td> <td>Horror</td> <td>Extreme discomfort</td> <td>Fear</td> <td>Dismay</td> </tr> </table> ",
      darwin_choice: 'Terror',
      letters_url: 'hello bla bla',
      darwin:
        "<div class='darwinSaid'><h3>What Darwin said:</h3><p><i>Expression</i>, pp. 299–300: <br/><br/> The original photograph was shown to twenty-four persons, and they were separately asked, without any explanation being given, what expression was intended: twenty instantly answered, 'intense fright' or 'horror;' three said pain, and one extreme discomfort. <br/><br/> Darwin used an engraving based on this photograph in Expression, p. 299 Fig. 20.  He marked up his copy of the plate for the engraver, and wrote 'omit galvanic instruments & Hands of operators. Attend to wrinkles on neck, & forehead— form of mouth' .</p></div>",
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3><p>Destinées à l'étude de la contraction électrique combinée du peaucier et du frontal, associée à l'abaissement de la mâchoire inférieure, chez le ême sujet. Contraction électrique des peauciers, des frontaux, avec abaissement volongaire de la mâchoire inférieure: <i>effroi</i>, vu de face dans la figure 61, et de profil dans la figure 62.<br/><br/> [Intended as a study of the combined electric contraction of the platysma and the frontal, associated with the depression of the lower jaw: terror, seen face on in figure 61, and in profile in figure 62.]<br/><br/> Figure 61 in Duchenne 1862, Chapter XI <i>Muscle de la frayeur, de l'effroi</i> (Muscle of fear and terror)</p></div>",
      averagetime: '6',
      video:
        'http://video.darwin.lib.cam.ac.uk/xmoov_mws.php/0601602Y1Vterrified.flv',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p3.jpg',
    },
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 4',
      image_url: 'DAR.LIB.T.160.OUTSIZE_45.png',
      thumb_url: 'DAR.LIB.T.160.OUTSIZE_45_thumb.png',
      info: "<table summary='DAR 186 27'> <tr> <th></th> <th>Hensleighs</th> <th>Blyth</th> <th>Trimen</th> <th>Horace</th> <th>Mrs Lushington</th> <th>Mr. L.</th> <th>Mr Farrar</th> <th>Henslow</th> </tr> <tr> <th>Despair &amp; grief</th> <td>Yes, no, yes</td> <td>No</td> <td>Disgust</td> <td>No</td> <td>Intense annoyance</td> <td>Submission</td> <td>?</td> <td>Incredulity, extreme</td> </tr> </table> <table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Despair &amp; Grief</th> <td>Grief</td> <td>Pain</td> <td></td> <td>Sudden grief</td> <td></td> <td>Pain or contempt</td> <td>Contemptuous anger</td> <td>Disgust</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Despair &amp; Grief</th> <td>Contempt</td> <td>Dejection</td> <td>Contempt (Bearing pain Miss Th.)</td> <td>Hatred</td> <td>Supercilious contempt owning to lower lip</td> <td>Disgust</td> <td>Disgust</td> <td>Misery</td> </tr> </table> ",
      darwin_choice: 'Grief and despair',
      letters_url: 'hello bla bla',
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3><p>Destinée à l'étude de la contraction combiné, expressive, du triangulaire des lèvres, au maximum de contraction, chez le même sujet. Contraction électrique très forte des triangulaires des lèvres: <i>dégoût</i>. <br/><br/> [Intended as a study of the combined, expressive, contraction of the depressor anguli oris [triangular of the lips], to their maximum contraction, in the same subject. Very strong electric contraction of the depressor anguli oris: disgust.] <br/><br/> Figure 45 in Duchenne 1862, Chapter VIII, <i>Muscle de la tristesse</i> (Muscle of sadness)</p></div>",
      darwin: '',
      averagetime: '8',
      video: '',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p4.jpg',
    },
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 5',
      image_url: 'DAR.LIB.T.160.OUTSIZE_65.png',
      thumb_url: 'DAR.LIB.T.160.OUTSIZE_65_thumb.png',
      info: "<table summary='DAR 186 27'> <tr> <th></th> <th>Hensleighs</th> <th>Blyth</th> <th>Trimen</th> <th>Horace</th> <th>Mrs Lushington</th> <th>Mr. L.</th> <th>Mr Farrar</th> <th>Henslow</th> </tr> <tr> <th>Torture, agony</th> <td>Yes, no, yes</td> <td>Yes</td> <td>Pain</td> <td>Yes</td> <td>Fright</td> <td>Great sudden pain</td> <td>Startled expression</td> <td>Torture</td> </tr> </table> <table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Torture &amp; Agony</th> <td></td> <td></td> <td></td> <td>Calling out from sudden pain</td> <td>Cry of anger</td> <td>Sudden anger</td> <td></td> <td>Contemplating a catastrophe &amp; fearing it would come on selfcurious fear</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Torture &amp; Agony</th> <td>Disgust</td> <td>Rage</td> <td>Torture, agony</td> <td>Anger</td> <td>Anger</td> <td>Pain</td> <td>Horror</td> <td>Terror</td> </tr> </table> ",
      darwin_choice: 'Agony torture and fright',
      letters_url: 'hello bla bla',
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3><p>Figures 64 and 65:<br/><br/>Destinées à l'étude de la contraction électrique combinée des peauciers et des sourciliers, associée à l'abaissement de la mâchoire inférieure, chez le même sujet.Contraction combinée des peauciers et des sourciliers, avec abaissement volontaire de la mâchoire inférieure: effroi mêlé de douleur, torture.Dans la figure 64, la contraction du peaucier est plus énergique à gauche qu'`a droite; en regardant successivement chacune des moitiés de cette figure, on voit l'augmentation graduelle de la douleur et de l'effroi.<br/><br/>[Intended as a study of the combined electric contraction of the platysma and the corrugatores supercillii, associated with the depression of the lower jaw, in the same subject.Combined contraction of the platysma and the corrugatores supercillii, with voluntary depression of the lower jaw: <i>terror mixed with suffering, torture</i>.In figure 64, the contraction of the platysma is more energetic on the left than on the right; by looking one by one at each half of this figure, one sees the gradual increase of suffering and terror.]<br/><br/>Figure 65 in Duchenne 1862, Chapter XI Muscle de la frayeur, de l'effroi (Muscle of fear and terror)</p></div>",
      darwin:
        "<div class='darwinSaid'><h3>What Darwin said:</h3><p>Expression, p. 306:<br/><br/>I have shown the original of this photograph to twenty-three persons of both sexes and various ages; and thirteen immediately answered horror, great pain, torture, or agony; three answered extreme fright; so that sixteen answered nearly in accordance with Duchenne's belief. Six, however, said anger, guided no doubt, by the strongly contracted brows, and overlooking the peculiarly opened mouth. One said disgust. On the whole, the evidence indicates that we have here a fairly good representation of horror and agony.<br/><br/>Darwin had an engraving made from this plate and used it in Expression (p. 306, fig 21). <br/><br/> On the original photograph he wrote 'Omit the galvanic instruments & Hands of operator', and on the back: 'Agony, torture & fright'</p></div>",
      averagetime: '9',
      video: '',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p5.jpg',
    },
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 6',
      image_url: 'DAR.LIB.T.160.OUTSIZE_49.png',
      thumb_url: 'DAR.LIB.T.160.OUTSIZE_49_thumb.png',
      info: " <table summary='DAR 186 27'> <tr> <th></th> <th>Hensleighs</th> <th>Blyth</th> <th>Trimen</th> <th>Horace</th> <th>Mrs Lushington</th> <th>Mr. L.</th> <th>Mr Farrar</th> <th>Henslow</th> </tr> <tr> <th>Crying</th> <td>No, no, no</td> <td>No</td> <td>Doubt expression</td> <td>Yes</td> <td>Sadness</td> <td>Bereavement</td> <td>Sad</td> <td>Looking an intense light</td> </tr> </table> <table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Crying</th> <td>Sorrow</td> <td>Distress</td> <td></td> <td>Cunning leer</td> <td></td> <td>Grief peevish</td> <td>Endurance of pain</td> <td>Mistery, just giving way</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Face Crying</th> <td></td> <td>Crying</td> <td>Commencement of extreme agony</td> <td>Pain</td> <td>Jocund</td> <td>Ready to cry</td> <td>Measuring a distance</td> <td>Pain</td> </tr> </table> ",
      darwin_choice: 'Crying from grief',
      letters_url: 'hello bla bla',
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3><p>Destinée à l'étude de l'association du petit zygomatique et du sourcilier, chez le même sujet. <br>A gauche, excitation électrique du petit zygomatique et du sourcilier: pleurer douloureux. <br>A droite, physionomie au repos, avec regard fixe en avant. <br/><br/> [Intended as a study of the association of the zygomaticus minor and the corrugator supercillii, in the same subject. <br>On the left, electric incitement of the zygomaticus minor and the corrugator supercillii: <i>mournful crying</i>. <br>On the right, his physiognomy at rest, with the gaze fixed straight ahead.] <br/><br/> Figure 49 in Duchenne 1862, Chapter IX, <i>Muscles du pleurer et du pleurnicher</i> (Muscles of crying and whimpering) </p></div>",
      darwin:
        "<div class='darwinSaid'><h3>What Darwin said:</h3><p>Expression, p. 150-51, n.4:<br><br>  With respect to another figure by Dr. Duchenne (fig. 49), in which the muscles of half the face are galvanized in order to represent a man beginning to cry, with the eyebrow on the same side rendered oblique, which is characteristic of misery, the expression was recognized by a greater proportional number of persons. Out of twenty-three persons, fourteen answered correctly, 'sorrow,' 'distress,' 'grief,' 'just going to cry,' 'endurance of pain,' &c. On the other hand, nine persons either could form no opinion or were entirely wrong, answering, 'cunning leer,' 'jocund,' 'looking at an intense light,' 'looking at a distant object,' &c.<br/><br/>Darwin wrote on the photograph 'good. compare with Pl. 53'</p></div>",
      averagetime: '12',
      video: '',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p6.jpg',
    },
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 7',
      image_url: 'DAR.LIB.T.160.OUTSIZE_48.png',
      thumb_url: 'DAR.LIB.T.160.OUTSIZE_48_thumb.png',
      info: " <table summary='DAR 186 27'> <tr> <th></th> <th>Hensleighs</th> <th>Blyth</th> <th>Trimen</th> <th>Horace</th> <th>Mrs Lushington</th> <th>Mr. L.</th> <th>Mr Farrar</th> <th>Henslow</th> </tr> <tr> <th>Laughing &amp; crying</th> <td></td> <td></td> <td>Laughing, yes</td> <td>Both sides wrong</td> <td>Yes</td> <td>Yes</td> <td>Yes</td> <td>Yes, yes</td> </tr> </table> <table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Laughing, crying</th> <td>Laughter</td> <td>Amusement</td> <td></td> <td>Smiling</td> <td>Merriment</td> <td>Do</td> <td></td> <td>Ironical laughter</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Laughing, Crying</th> <td>Tickled, amused</td> <td>Laughter</td> <td>Fun</td> <td>Amusement</td> <td>Laughing</td> <td>Laughing</td> <td>Assert with laughing</td> <td>Laughing</td> </tr> </table> ",
      darwin_choice: 'Half face crying half laughing',
      letters_url: 'hello bla bla',
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3><p>Destiné à l’étude comparative des lignes expressives différentielles du petit zygomatique et du grand zygomatique, chez le meme sujet vu de face. <br>A gauche, contraction électrique du petit zygomatique: pleurer modéré, attendrissement.<br> A droite, contraction électrique modérée du grand zygomatique: rire faux, incomplet. <br/><br/> [Intended for comparative study of the differential expressive lines of the zygomaticus minor and the zygomaticus major, in the same subject seen in front-view. On the left, electric contraction of the zygomaticus minor: restrained crying, pity. <br>On the right, restrained electric contractionof the zygomaticus major: false, partial laughter.]<br/><br/> Figure 48 in Duchenne 1862, Chapter IX, <i>Muscles du pleurer et du pleurnicher</i> (Muscles of crying and whimpering)</p></div>",
      darwin:
        "<div class='darwinSaid'><h3>What Darwin said:</h3><p><i>Expression</i>, p. 150-51, n.4: <br/><br/>Almost all those (viz. nineteen out of twenty-one persons) to whom I showed the smiling half of the face instantly recognized the expression; but, with respect to the other half, only six persons out of twenty-one recognized it,—that is, if we accept such terms as 'grief,' 'misery,' 'annoyance,' as correct;—whereas, fifteen persons were ludicrously mistaken; some of them saying the face expressed 'fun,' 'satisfaction,' 'cunning,' 'disgust,' &c. We may infer from this that there is something wrong in the expression. <br/><br/> Darwin wrote by Duchenne’s description: “The little Zyg. raises lowers eye did more than great zygomatic.”</p></div>",
      averagetime: '16',
      video: '',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p7.jpg',
    },
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 8',
      image_url: 'DAR.LIB.T.160.OUTSIZE_19.png',
      thumb_url: 'DAR.LIB.T.160.OUTSIZE_19_thumb.png',
      info: "<table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Suffering</th> <td>Trying to understand</td> <td>Pain or distress</td> <td></td> <td>Subdued sorrow</td> <td></td> <td>Curiosity</td> <td>Puzzle bewilderment</td> <td>Bewilderment</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Suffering</th> <td>Enquiry thought</td> <td></td> <td>Surprise &amp; incredulity</td> <td>Pain</td> <td>Puzzlement</td> <td>Tragic feeling</td> <td>Tragic feeling</td> <td>Annoying</td> </tr> </table> ",
      darwin_choice: 'Suffering',
      letters_url: 'hello bla bla',
      darwin: '',
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3><p>Destinée, ainsi que la figure 20, à l’étude des lignes expressive, fondamentales et secondaire, produites par la contraction électrique modérée du sourcilier, chez un vieillard (représenté dans les figures 3, 6, 7, 8, 9, 12, 13, 14, 17 et 18).  A droite, contraction électrique du sourcilier à un degree moyen: souffrance.<br> A gauche, physionomie au repos, avec regard perdu (le côté oppose était dans cet état au moment de l’expérience). <br/><br/> [Intended, like figure 20, as a study of the expressive lines, primary and secondary, produced by moderate electric contraction of the corrugator supercillii of an old man (represented in figures 3, 6, 7, 8, 9, 12, 13, 14, 17 and 18). <br>On the right, electric contraction of the corrugator supercillii to a medium degree: suffering. <br>On the left, his physiognomy at rest, with a preoccupied expression (the opposite side was in this state at the time of the experience).] <br/><br/> Figure 19 in Duchenne 1862, Chapter V, <i>Muscle de la douleur</i> (Muscle of grief)</p></div>",
      averagetime: '7',
      video: '',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p8.jpg',
    },
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 9',
      image_url: '9.png',
      thumb_url: '9_thumb.png',
      info: " <table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Deep Grief</th> <td>Grief</td> <td>Thoughtful sorrow</td> <td></td> <td>To move compassion</td> <td>Scorn</td> <td>Despairing sorrow</td> <td>Suffering endurance</td> <td>An unhappy gentleman</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Deep Grief</th> <td>Sorrow</td> <td>Grief</td> <td>Patient suffering</td> <td>Grief</td> <td>Grief</td> <td>Tragic feeling</td> <td>Sorrowful</td> <td>Melancholy</td> </tr> </table> ",
      darwin_choice: 'Deep grief',
      letters_url: 'hello bla bla',
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3><p>Destinée à l’étude de la contraction volontaire à un degree plus fort que dans la figure 23, chez le même sujet vu de face, et don’t l’œil est tourné obliquement en haut et de côté, comparativement à la contraction du frontal, avec le même movement de l’œil. <br>A gauche, contraction volontaire du sourilier à un degree plus fort que dans la figure 23; regard en haut et en dehors, bouch entr’ouverte: <i>douleur extreme</i> jusqu’à l’épuisement; le sujet paraît succomber à la souffrance: <i>tête de Christ</i>. <br>A droite, contraction volontaire du frontal, avec regard un peu oblique en haut et en dedans et avec bouche un peu entr’ouverte: <i>souvenir d’amour</i> ou regard extatique.<br/><br/> [Intended as a study of the voluntary contraction to a stronger degree than in figure 23, in the same subject seen straight on, and in which the eye is turned obliquely above and to the side, compared to the frontal contraction, with the same movement of the eye. On the left, voluntary contraction of the corrugator supercillii to a stronger degree than in figure 23; the gaze above and outwards, mouth slightly open: extreme suffering almost to the point of exhaustion; the subject seems to succumb to suffering: the head of Christ. On the right, voluntary contraction of the frontal, with the gaze a little oblique and above and inwards with the mouth slightly open: <i>memory of love or extatic gaze</i>.] <br/><br/> Figure 24 in Duchenne 1862, Chapter V, <i>Muscle de la douleur</i> (Muscle of grief) </p></div>",
      darwin:
        "<div class='darwinSaid'><h3>What Darwin said:</h3><p><i>Expression</i>, p. 182: <br/><br/> Darwin described the subject of the photograph as a “good actor”, continuing: <br/><br/> In fig. 2 [Expression, Plate II, Fig. 2 – a reproduction of this photograph] he is shown simulating grief, but the two eyebrows, as before remarked, are not equally acted on. That the expression is true, may be inferred from the fact that out of fifteen persons, to whom the original photograph was shown, without any clue to what was intended being given them, fourteen immediately answered, 'despairing sorrow,' 'suffering endurance,' 'melancholy,' and so forth. </p></div>",
      averagetime: '7',
      video: '',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p9.jpg',
    },
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 10',
      image_url: '10.png',
      thumb_url: '10_thumb.png',
      info: " <table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Fright with agony</th> <td>Seen a ghost</td> <td>Horror</td> <td></td> <td>Extreme horror</td> <td>Suffering</td> <td>Agony</td> <td>Terror</td> <td>Horror</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Fright &amp; Pain &amp; Torture</th> <td>Fright</td> <td>Terror</td> <td>Surprise &amp; Horror</td> <td>Agony</td> <td>Horror verging on madness</td> <td>Extreme terror</td> <td>Anger or Terror</td> <td>Fright</td> </tr> </table> ",
      darwin_choice: 'Fright with agony',
      letters_url: 'hello bla bla',
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3><p>Figures 64 and 65: <br/><br/> Destinées à l'étude de la contraction électrique combinée des peauciers et des sourciliers, associée à l'abaissement de la mâchoire inférieure, chez le même sujet. Contraction combinée des peauciers et des sourciliers, avec abaissement volontaire de la mâchoire inférieure: <i>effroi mêlé de douleur, torture</i>. Dans la figure 64, la contraction du peaucier est plus énergique à gauche qu'`a droite; en regardant successivement chacune des moitiés de cette figure, on voit l'augmentation graduelle de la douleur et de l'effroi. <br/><br/> [Intended as a study of the combined electric contraction of the platysma and the corrugatores supercillii, associated with the depression of the lower jaw, in the same subject. Combined contraction of the platysma and the corrugatores supercillii, with voluntary depression of the lower jaw: <i>terror mixed with suffering, torture</i>. In figure 64, the contraction of the platysma is more energetic on the left than on the right; by looking one by one at each half of this figure, one sees the gradual increase of suffering and terror.] <br/><br/> Figure 64 in Duchenne 1862, Chapter XI Muscle de la frayeur, de l'effroi (Muscle of fear and terror)</p></div>",
      darwin:
        "<div class='darwinSaid'><h3>What Darwin said:</h3><p><i>Expression</i>, p. 300: <br/><br/> Dr. Duchenne has given another photograph of the same old man, with the platysma contracted, the eyes and mouth opened, and the eyebrows rendered oblique, by means of galvanism. The expression thus induced is very striking (see Plate VII. fig. 2); the obliquity of the eyebrows adding the appearance of great mental distress. The original was shown to fifteen persons; twelve answered terror or horror, and three agony or great suffering. <br/><br/> Reproduced in Expression, Plate VII, Fig 2. <br/><br/> Darwin wrote `11, circled in pencil, on the photograph, but it is clearly emotion number 10 in his experiment. </p></div>",
      averagetime: '6',
      video: '',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p10.jpg',
    },
    {
      question: 'Which emotion do you think the image conveys?',
      title: 'Emotion 11',
      image_url: 'DAR.LIB.T.160.OUTSIZE_16.png',
      thumb_url: 'DAR.LIB.T.160.OUTSIZE_16_thumb.png',
      info: "<table summary='Dar 186 28'> <tr> <th></th> <th>Amy Crofton</th> <th>Lucy Wedgwood</th> <th>Sophia Wedgwood</th> <th>Crotch</th> <th>Dr Gray</th> <th>Mrs Gray</th> <th>Mrs Hooker</th> <th>Mr Woolner</th> </tr> <tr> <th>Hardness</th> <td>Contempt or reproof</td> <td></td> <td></td> <td>Cynical pride</td> <td></td> <td></td> <td></td> <td>Nothing</td> </tr> </table> <table summary='DAR 186 29'> <tr> <th></th> <th>Strickland</th> <th>George</th> <th>Huxley</th> <th>R. Ruck</th> <th>Clement Wedgwood</th> <th>Miss S. Horner</th> <th>Miss Pertz</th> <th>Mrs Pertz</th> </tr> <tr> <th>Hardness</th> <td></td> <td></td> <td></td> <td></td> <td></td> <td>Surly Reserve</td> <td>Decided character</td> <td>Thought</td> </tr> </table>",
      darwin_choice: 'Hardness',
      letters_url: 'hello bla bla',
      duchene:
        "<div class='ducheneSaid'><h3>What Duchenne said:</h3><p>Destinée à démontrer, par l’expérimentation électrique, que le pyramidal du nez se termine supérieurement dans la peau, au niveau de la tête du sourcil. Contraction électrique des pyramidaux chez un jeune homme d’un caractère doux (voy. son portrait, fig. 4): expression de dureté. <br><br>[Intended to demonstrate, by electrical experimentation, that the pyramidal of the nose ends very high in the skin, from the top of the head to the eyebrow. Electric contraction of the pyramidals of a young man of a gentle character (see his portrait, fig 4): expression of hardness.]</p></div>",
      darwin:
        "<div class='darwinSaid'><h3>What Darwin said:</h3><p> <i>Expression</i>, pp. 231–2: <br/><br/> I have shown Duchenne's photograph of a young man, with this muscle [the pyramidal of the nose] strongly contracted by means of galvanism, to eleven persons, including some artists, and none of them could form an idea what was intended, except one, a girl, who answered correctly, 'surly reserve.' <br/><br/> By Duchenne’s description, Darwin wrote: It seems to me not well marked. Seems to me to serve to bring whole skin of forehead down as a pent-house over the eyes.—</p></div>",
      averagetime: '9',
      video: '',
      diagram: '/sites/all/modules/darwin_emotion/images/Emotion-p11.jpg',
    },
  ],
}

/********/

var answers =
  'fright,extreme terror,surprise and horror,horror verging on madness,enquiry thought,amusement,tragic feeling,measuring a distance,patient suffering,arrogance,assert with laughing,tickled amused,ready to cry,superlicious,hatred,contempt,extreme discomfort,woeful astonishment,intense amusement,wicked joke,bewilderment,bereavement,disgust and wonder,trying to laugh,contempt or reproof,despairing sorrow,to move compassion,scorn,thoughtful sorrow,puzzle bewilderment,bewilderment,trying to understand,intern misery,trying to stop laughing,ironical laughter,merriment,do,misery,endurance from pain,calling out from sudden pain,sudden anger,cry of anger,grinning smile,amusement,angry,abandoned,abased,abashed,abasing,abhorred,abhorring,abominated,abominating,absolved,absolving,absorbed,abused,abusive,accepted,accepting,accusatory,accused,adamant,addled,admiring,admonished,admonishing,adored,adoring,adventurous,affable,affectionate,affinity,affronted,afraid,aggravated,aggressive,aggrieved,aghast,agitated,agonised,agony torture and fright,agonising,agreeable,alarmed,alert,alienated,alluring,aloof,amazed,ambivalent,amenable,amiable,amicable,amorous,amused,anguished,animated,animosity,annoyed,antagonised,antagonistic,anticipating,antipathy,anxious,apathetic,apologetic,appalled,appealing(askingfor),appealing(attractive),appeased,appeasing,appreciated,appreciative,apprehending,apprehensive,approachable,approbatory,approved,approving,ardent,ardour,argumentative,aroused(stimulated),arrogant,ashamed,asking,assailed,assertive,assessing,assuaged,assuaging,assured,astonisment,astounded,attacked,attentive,attracted,attractive,avaricious,awed,awkward,backed,bad-tempered,baffled,bashful,battered,beaten,befuddled,begging,begrudging,beguiling,beleaguered,belied,believing,belittled,belittling,bellicose,belligerent,beloved,bemused,benevolent,benign,bereft,beseeching,besotted,betrayed,bewildered,bewitched,bitchy,bitter,blamed,blaming,blank,blase,blessed,blissful,blithe,bloodthirsty,blue,bold,bolstered,bolstering,bombarded,boosted,bored,bothered,brash,brazen,broken,brooding,browbeaten,brutal,bubbly,bullied,bullying,bumptious,buoyant,butterflies,cagey,cajoled,cajoling,calculating(scheming),calculating(thinking),callous,calm,calming,candid,captivated,carefree,caring,carping,castigated,castigating,casual,categorical,cautious,celebratory,censured,censuring,certain,chafed,chagrin,charitable,chastened,chastening,chastised,chastising,cheated,cheeky,cheered,cheerful,cheering,cheerless,cherished,cherishing,chided,chiding,chipper,chirpy,choleric,choosing,chummy,circumspect,close,clueless,coaxing,cocky,coerced,coercing,cogitating,cold,collected,combative,comfortable,comforted,comforting,commanded,commiserating,committed,compassionate,compelled,competitive,complacent,complaining,composed,comprehending,compunctious,concealing,conceited,concentrating,concerned,condemned,condemning,condescending,confident,confounded,confrontational,confronted,confused,congenial,congratulatory,conniving,considering,consoled,consoling,consternation,contemplative,contemptible,contemptuous,contemptuous anger,content,contradicted,contradictory,contrary,contrite,controlled(byother),convinced,convivial,cool,cooperative,cordial,corrected,courageous,courteous,covetous,cowardly,cowed,coy,crabby,crafty,cranky,craven,craving,crestfallen,critical,criticised,cross,crossed,crotchety,cruel,crushed,cunning,cunning leer,curious,cynical,cynical pride,daring,daunted,daydreamy,dazed,deadpan,debased,debasing,debating,deceitful,decided,deciding,dedicated,defamed,defaming,defeated,deferential,defiant,definite,deflated,degraded,degrading,dejected,delighted,demanding,demeaned,demeaning,demoralised,demoralising,denigrated,denigrating,depressed,derided,deriding,derisive,deserted,desirable,desiring,desolate,despairing,desperate,despicable,despised,despising,despondent,detached,determined,detested,detesting,detracting,devastated,devilish,devious,devoted,devout,difficult,diffident,disaffected,disagreeable,disappointed,disapprobatory,disapproving,disbelieved,disbelieving(sceptical),discarded,disciplining,discomforted,discomposed,disconcerted,disconnected,disconsolate,discontented,discouraged,discouraging,discredited,disdained,disdainful,disenchanted,disengaged,disgraced,disgruntled,disgust,disheartened,disillusioned,disinclined,disliked,disliking,dismay,disobedient,disorientated,disparaged,disparaging,dispirited,dispiriting,displeased,disquieted,disregarded,disregarding,disrespected,disrespectful,dissatisfied,distant,distaste,distracted,distraught,distress,distrustful,disturbed,docile,dogmatic,doleful,dolorous,dominated,domineering,doting,doubt,doubtful,down,downtrodden,drained,dreading,dreamy,dubious,dumbfounded,dumped,eager,earnest,easy-going,ebullient,ecstatic,edgy,effervescent,egotistical,elated,embarrassed,embittered,emboldened,empathic,emphatic,empty,enamoured,enchanted,encouraged,encouraging,engaged,engrossed,enigmatic,enjoying,enmity,ennui,enquiring,enraged,enraptured,ensnared,entertained,enthralled,enthusiastic,enticed,enticing,entranced,entrancing,entreating,envious,equanimous,euphoric,exasperated,excited,excluded,excused,excusing,execrated,exhilarated,exonerated,exonerating,expectant,exploited,explosive,expressionless,exuberant,exultant,faltering,familiar,fanatical,fancying,fantasising,fascinated,fatigued,fawning,fearful,fearless,feeble,felicity,ferocious,fervent,festive,fierce,fine,flabbergasted,flattered,flattering,flexible,flirtatious,floored,flummoxed,flustered,focused,fond,foolish,forced,forceful,foreboding,forgiven,forlorn,forsaken,fortunate,forward,fractious,crying from grief,greef peevish,sudden grief,frank,frantic(worried),fraught,frenetic,frenzied,fretful,friendly,frightened,fright with agony,frigid,frisky,frosty,frustrated,fulfilled,fuming,furious,furtive,gauging,generous,genial,giving,glad,gleeful(delight),gleeful(gloating),gloating,gloomy,glum,goaded,gobsmacked,gracious,grasping(greedy),grasping(realising),grateful,gratified,grave,greedy,deep grief,grief and despair,grieving,griping,gripped,grouchy,grumpy,guarded,guilty,gutless,gutsy,half face crying half laughing,hankering,happy,harassed,harshness,harried,hassled,hated,hateful,hating,heartache,heartbroken,heartened,heartening,heartless,heated,heavy-hearted,helpful,helpless,heroic,hesitant,hollow,homesick,honest,hopeful,hopeless,horrified,hospitable,hostile,humble,humiliated,humiliating,humouring,hurt,hurtful,hysterical(over-excited),hysterical(upset),icy,idiotic,ignominious,ignored,ill-humoured,immersed,immodest,impassioned,impassive,impatient,imperious,impertinent,imploring,impressed,impudent,inadequate,inattentive,incensed,included,incompetent,inconsolable,incredulous,indebted,indecisive,indicted,indicting,indifferent,indignant,infatuated,inferior,inflamed,inflexible,infuriated,inimical,injured,inquisitive,insecure,insensitive,insincere,insistent,insolent,insouciant,inspired,inspiring,insulted,insulting,intent,interested,intimate,intimidated,intolerant,intrepid,intrigued,introverted,inveigled,inveigling,inviting,involved,irascible,irate,irked,irritable,irritated,isolated,jaded,jealous,jittery,jocular,jocund,joking,jolly,joshing,jovial,joyful,jubilant,judged,judging,judgmental,jumpy,keen,kind,knowing,laughter,lachrymose,languid,languorous,lassitude,lazy,lethargic,lighthearted,liked,lily-livered,listening,listless,lively,livid,loathed,loathing,lofty,lonely,lost,lovesick,loving(affection),loving(passion),low,lucky,lured,luring,lustful,lying,malevolent,malicious,maligned,maligning,maudlin,mean,meditative,melancholic,mellow,menacing,mendacious,merciless,merry,miffed,mirthful,mischievous,miserable,misjudged,mistreated,mistrustful,moaning,modest,mollified,mollifying,moody,mopey,morose,mortified,motivated,motivating,mournful,moved,muddled,mulling,munificent,murderous,mysterious,mystified,narked,nasty,nauseated,needed,needled,needy,neglected,neglecting,nervous,nettled,niggled,nonchalant,nonplussed,nostalgic,obdurate,obliged(compelled),obliged(grateful),obsequious,obsessed,obstinate,obstructive,odium,offended,offhand,ok,opinionated,oppressed,oppressive,optimistic,ostracised,outgoing,outraged,overbearing,overcome,overjoyed,overlooked,overlooking,overpowering,overweening,overwhelmed(overcome),overwrought,pacified,pacifying,pained,pain or contempt,pain and wonder,panicked,pardoned,pardoning,passionate,passive,pathetic,patient,patronised,patronising,peaceful,peeved,penitent,pensive,perplexed,persuaded,perturbed,pessimistic,pestered,petrified,pining,piqued,pitiless,pitying,placated,placating,placid,playful,pleading,pleased,pleasure,plucky,pokerfaced,polite,pompous,pondering,positive,powerless,praised,praising,prepared,pressured,prickly,prized,protected,protective,proud,provoked,pugnacious,punishing,punitive,purposeful,pushy,pusillanimous,puzzled,querulous,querying,questioned,questioning,radiant,ragging,raging,rankled,rapt,rapturous,rattled,realising,reassured,rebellious,rebuffing,rebuked,rebuking,recalcitrant,reconciled,reconciling,reflective,refractory,refreshed,refuted,regard(fond),regarding(thinking),regretful,rejecting,rejoicing,rejuvenated,relaxed,relieved,relished,relishing,reluctant,remorseful,remote,repelled,repentant,reprimanded,reprimanding,reproached,reproachful,reproved,reproving,repudiated,repulsed,resentful,reserved,resigned,resolute,respectful,responsible,restless,reticent,retiring,reviled,revived,revolted,revulsion,rewarded,ribbing,ridiculed,ridiculing,riled,riveted,romantic,rubbished,rubbishing,rude,rueful,ruffled,rushed,sad,sadistic,safe,sang-froid,sanguine,sardonic,satisfied,savage,savouring,scandalised,scared,sceptical,scheming,schmaltzy,scolded,scolding,scorned,scornful,secretive,secure,seduced,seductive,seething,selecting,self-conscious,self-deprecating,self-effacing,self-important,selfish,self-possessed,self-righteous,self-satisfied,sensitive(caring),sentimental,serene,serious,settled,shaken,shamefaced,shattered,sheepish,shifty,shocked,shunning,shy,sickened,silly,sincere,slighted,slushy,sly,smitten,smug,snappy,sneaky,sneering,snide,snubbed,sober,sociable,solemn,sombre,soothed,soothing,soppy,sorrowful,sorrow,sorry,so-so,speechless,spellbound,spineless,spirited,spiteful,splenetic,spurning,staggered,standoffish,startled,stern,stimulated,stressed,stricken,strict,strong,strong-willed,terror,stroppy,stubborn,stumped,stunned,suffering,stupefied,stupid,stupid wonder,subdued,subdued sorrow,curiosity,submissive,subservient,sulky,sullen,supercilious,superior,suppliant,supported,supportive,sure,surly,surprise,surprise astonishment,suspicious,swaggering,sympathetic,syrupy,tantalised,taunted,tearful,teasing,tempted,tempting,tender,tense,terrified,testy,tetchy,thinking,thoughtful(thinking),threatened,threatening,thrilled,tickled,timid,tired,titillated,tolerant,tormented,tortured,touched,touchy,tranquil,treasured,trepidation,triumphant,truculent,trusting,turmoil,twigging,twitchy,umbrage,unabashed,unapproachable,unassuming,uncaring,uncertain,uncomfortable,unconcerned,uncontrolled,unconvinced,uncooperative,undecided,understanding,understanding(kind),uneasy,unemotional,unenthusiastic,unfeeling,unfocused,unfriendly,unhappy,unimpressed,uninhibited,uninterested,uninvolved,unkind,unmoved,unnerved,unreceptive,unrelenting,unremitting,unresponsive,unrestrained,unrestricted,unruffled,unsettled,unsure,unsympathetic,unthinking,unyielding,upbeat,upset,uptight(angry),uptight(tense),useless,vacant,vacillating,vague,vain,valiant,valued,vehement,vengeful,vexed,vibrant,vicious,vigilant,vindicated,vindictive,violent,vituperative,vivacious,volatile,vulnerable,wanted,wanting,warm,wary,watchful,wavering,weak,weary,weepy,welcomed,welcoming,whinging,whining,wild,wilful,willing,wily,wishful,wistful,withdrawn,woeful,wonder,wondering(thinking),horror,abject terror,worthless,wounded,wrathful,wretched,yearning,zealous,zestful,afraid,neutral,agreeing,disagreeing'

// objects
darwin.questions
darwin.progressBar
darwin.currentQuestionIndex
darwin.totalQuestions
darwin.questionSelected = false
darwin.savedAnswers = []
darwin.currentAnswer
darwin.answerData = []
darwin.saveData = {
  questions: [],
}

// data template to store a users answers
darwin.answerObject = {
  answerTime: '',
  questionData: '',
  questionID: '',
}

// data objects that can go in the database
darwin.saveObject = {
  answerID: '',
  answerTime: '',
}

// stopwatch related
darwin.currentSeconds = 0
darwin.activeTimer

/**
 * Init the application
 */
jQuery(document).ready(function () {
  // only activate the plugin when the container is present
  if (jQuery('#emotionsExperiment').length !== 0) {
    $('body').addClass('page-emotion-experiment')

    // wire the application
    darwin.wire()

    // load the data
    darwin.loadData()
  }
})

/**
 * Load the data (the list with questions)
 */
darwin.loadData = function () {
  var newSaveData = false

  darwin.totalQuestions = darwinquestiondata.questions.length
  darwin.questions = darwinquestiondata.questions

  var myTempData = answers.split(',')

  // add a capital to the autocompletion fields
  jQuery(myTempData).each(function (text, dataObject) {
    dataObject = dataObject.replace(/^\w/, function ($0) {
      return $0.toUpperCase()
    })
    darwin.answerData.push(dataObject)
  })

  // create a datastructure
  jQuery(darwin.questions).each(function (index, questionObject) {
    var questionData = {
      times: [],
      answers: [],
    }
    darwin.saveData.questions.push(questionData)
  })
}

/**
 * Generate DOM elements from the list with questions
 */
darwin.generateQuestion = function () {
  // start upating
  darwin.activeTimer = setInterval('darwin.updateClock()', 1000)
  darwin.currentSeconds = 0

  // get an answer object
  darwin.currentAnswer = jQuery.extend({}, darwin.answerObject)

  // update the title
  jQuery('#questionTitle').text(
    darwin.questions[darwin.currentQuestionIndex].title,
  )

  // update the counter
  jQuery('#progressBlock p')
    .empty()
    .append(
      darwin.currentQuestionIndex +
        1 +
        ' / ' +
        darwin.totalQuestions +
        ' Emotions',
    )

  // update the image
  if (darwin.currentQuestionIndex === 0) {
    jQuery('#questionImage img').css('display', 'none')

    //@PC
    jQuery('#questionImage img').load(function () {
      $(this).fadeIn(250)
    })
    jQuery('#questionImage img').attr(
      'src',
      darwin.config.imagePath +
        darwin.questions[darwin.currentQuestionIndex].image_url,
    )
  } else {
    jQuery('#questionImage img').fadeOut(250, function () {
      jQuery(this).attr(
        'src',
        darwin.config.imagePath +
          darwin.questions[darwin.currentQuestionIndex].image_url,
      ) //@PC.fadeIn(250);
    })
  }

  // generate the answers for the current question
  jQuery('#openAnswer').autocomplete({
    source: darwin.answerData,
    minLength: 2,
    select: function (event, ui) {
      darwin.questionSelected = true
      jQuery('#nextQuestionButton').css('opacity', '1')
      jQuery('#nextQuestionButton').removeClass('disabled')
    },
  })

  // some very basic validation
  darwin.questionSelected = false
  //jQuery('#nextQuestionButton').attr("disabled", true);
  jQuery('#nextQuestionButton').css('opacity', '0.6')
  jQuery('#nextQuestionButton').addClass('disabled')

  jQuery('#openAnswer').bind('keypress', function (e) {
    darwin.validateAnswer()
  })

  jQuery('#openAnswer').bind('change', function (e) {
    darwin.validateAnswer()
  })

  jQuery('#openAnswer').keydown(function (e) {
    if (e.which == 8) {
      darwin.validateAnswer()
    }
  })

  // update the processbar
  var myCurrentIndex = darwin.currentQuestionIndex + 1
  var myTotal = darwin.totalQuestions
  var myPercentage = Math.round((myCurrentIndex / myTotal) * 100)
  // get the current percentage
  jQuery(darwin.progessBar).progressbar({
    value: myPercentage,
  })

  jQuery('#openAnswer').focus('')

  // @PC/SI -- reconfigure secondary content
  $('.campl-secondary-content').trigger('reconfigure')
}

/**
 * Validate answer
 */
darwin.validateAnswer = function (activeInput) {
  if (jQuery('#openAnswer').val().length >= 2) {
    darwin.questionSelected = true
    jQuery('#nextQuestionButton').css('opacity', '1')
    jQuery('#nextQuestionButton').removeClass('disabled')
  } else {
    darwin.questionSelected = false
    jQuery('#nextQuestionButton').css('opacity', '0.6')
    jQuery('#nextQuestionButton').addClass('disabled')
  }
}

/**
 * Starts the game
 */
darwin.startGame = function () {
  jQuery('#emotionsExperiment').insertBefore('#introductionPage')
  jQuery('#introductionPage').hide()
  jQuery('.content_sidebar').hide()
  jQuery('.content_content_sidebar').css({
    width: '936px',
  })

  // show the first question
  jQuery('#welcomePanel').hide()
  jQuery('#resultsContainer').hide()
  jQuery('#startButtonContainer').hide()
  jQuery('#questionPanel').show()

  // reset the progressBar
  jQuery(darwin.progessBar).progressbar({
    value: 0,
  })

  // reset the current index
  darwin.currentQuestionIndex = 0

  // remove all answers
  darwin.savedAnswers = []

  // generate the questions
  darwin.generateQuestion()

  // reset the next button's display
  jQuery('#nextQuestionButton a').text('Next Emotion')

  // remove the results
  jQuery('.generatedResult').remove()

  // set the title
  darwin.adjustPageTitle('Emotion Experiment')

  // Replace content divs
}

/**
 * Show the finish screen
 */
darwin.generateFinishScreen = function () {
  jQuery('#questionPanel').hide()
  jQuery('#resultsContainer').show()

  // set the title
  darwin.adjustPageTitle("Darwin's Conclusion")

  // generate the resultboxes
  jQuery(darwin.savedAnswers).each(function (resultIndex, resultObject) {
    darwin.saveData.questions[resultIndex].times.push(
      parseInt(resultObject.answerTime),
    )
    darwin.saveData.questions[resultIndex].answers.push(
      resultObject.selectedAnswer,
    )

    var clone = jQuery('.dummyResultBox')
      .first()
      .clone()
      .appendTo('#resultsContainer')
      .removeClass('dummyResultBox')
      .attr('data-id', resultIndex)
      .addClass('generatedResult')

    // the users answer + time
    var answerTime = darwin.getTimeStamp(resultObject.answerTime)

    // thumb
    jQuery(clone)
      .find('.resultThunbnail img')
      .attr(
        'src',
        darwin.config.imagePath + resultObject.questionData.thumb_url,
      )
    /*jQuery(clone).find('.resultThunbnail a').attr('href', darwin.config.imagePath + resultObject.questionData.image_url).lightBox({
     txtImage: 'Emotion',
     txtOf: '/'
     });*/

    // title
    jQuery(clone).find('h2').text(resultObject.questionData.title)

    // time spend

    jQuery(clone)
      .find('.resultGuess span')
      .append(
        resultObject.selectedAnswer +
          '<span class="timeSpan"> (in ' +
          answerTime +
          ')</span>',
      )

    // darwin's choice
    jQuery(clone)
      .find('.resultChoice span')
      .append(resultObject.questionData.darwin_choice)

    // average time
    jQuery(clone)
      .find('.resultTime span')
      .append(resultObject.questionData.averagetime + ' seconds')

    // hide options if they don't exist
    if (resultObject.questionData.info === '') {
      jQuery(clone).find('.moreInfoLink').css({
        display: 'none',
      })
    }

    var info = resultObject.questionData.duchene
    info = info.replace(/'/g, '"')
    jQuery(clone).find('.ducheneResult').append(info)

    info = resultObject.questionData.darwin
    info = info.replace(/'/g, '"')
    jQuery(clone).find('.darwinResult').append(info)

    jQuery(clone).find('.moreInfoResult').append(resultObject.questionData.info)
    jQuery(clone)
      .find('.moreInfoLink')
      .click(function () {
        var infoContainer = jQuery(this)
          .parent()
          .parent()
          .parent()
          .find('.moreInfoResult')

        if (jQuery(infoContainer).is(':visible')) {
          jQuery(this).text("See what Darwin's visitors thought")
          jQuery(infoContainer).slideUp()
        } else {
          jQuery(this).text("Hide what Darwin's visitors thought")
          jQuery(infoContainer).slideDown()
        }
      })

    jQuery(clone).find('.resultLinks').css({
      'margin-top': '5px',
    })

    // the related letters option
    jQuery(clone)
      .find('.duchenneLink')
      .click(function () {
        var infoContainer = jQuery(clone).find('.ducheneResult')

        if (jQuery(infoContainer).is(':visible')) {
          jQuery(this).text('What Duchenne said...')
          jQuery(infoContainer).slideUp()
        } else {
          jQuery(this).text('Hide what Duchenne said...')
          jQuery(infoContainer).slideDown()
        }
      })

    jQuery(clone)
      .find('.anLink')
      .attr('href', resultObject.questionData.diagram)

    jQuery(clone)
      .find('.darwinLink')
      .click(function () {
        var infoContainer = jQuery(this)
          .parent()
          .parent()
          .parent()
          .find('.darwinResult')

        if (jQuery(infoContainer).is(':visible')) {
          jQuery(this).text('What Darwin said...')
          jQuery(infoContainer).slideUp()
        } else {
          jQuery(this).text('Hide what Darwin said...')
          jQuery(infoContainer).slideDown()
        }
      })

    if (resultObject.questionData.video !== '') {
      jQuery('.videoContainer').hide()
      jQuery('.resultLinks', clone).css('margin-top', '10px')

      jQuery('.videoLink', clone).click(function () {
        var infoContainer = jQuery('.videoContainer', clone)

        if (jQuery(infoContainer).is(':visible')) {
          jQuery(this).text('Watch a video ..')
          jQuery(infoContainer).slideUp()

          darwin.closeVideo(jQuery('.videoContainer', clone))
        } else {
          jQuery(this).text('Hide video...')
          jQuery(infoContainer).slideDown()

          darwin.showVideo(
            jQuery('.videoContainer', clone),
            resultObject.questionData,
          )
        }
      })
    } else {
      jQuery('.videoLink', clone).hide()
    }

    if (resultIndex === 7) {
      jQuery('.darwinLink').last().hide()
    }

    if (resultIndex === 3) {
      jQuery('.darwinLink').last().hide()
    }
  })

  // save the data
  darwin.saveDataOnServer()

  jQuery('#resultsContainer').append(jQuery('#darwinResults'))
  jQuery('#resultsContainer').append(jQuery('#referencesBox'))
  jQuery('#resultsContainer').show()
  jQuery('.resultGuess').show()
  jQuery('#resultsContent').show()
  jQuery('#resultsIntroduction').insertBefore('#emotionsExperiment').show()
  jQuery('#resultsInfo').show().insertAfter('#emotionsExperiment')
}

/**
 * Define the proper timeStamp
 */
darwin.getTimeStamp = function (myTime) {
  var timeFormat = ''
  if (myTime == 1) {
    timeFormat = myTime + ' second'
  } else {
    timeFormat = myTime + ' seconds'
  }

  return timeFormat
}

/**
 * Get the most common answer
 */
darwin.getMostCommonAnswer = function (answerID) {
  var nums = darwin.saveData.questions[answerID].answers
  var freqs = {}
  var max_index
  var max_value = -1 / 0

  jQuery.each(nums, function (i, v) {
    if (freqs[v] != undefined) {
      freqs[v]++
    } else {
      freqs[v] = 1
    }
  })

  jQuery.each(freqs, function (num, freq) {
    if (freq > max_value) {
      max_value = freq
      max_index = num
    }
  })

  if (max_index != undefined) {
    return max_index
  }
}

/**
 * Get the average value from an array
 */
darwin.getAverage = function (answerID) {
  var sum = 0
  for (var i = 0; i < darwin.saveData.questions[answerID].times.length; i++) {
    sum = sum + parseInt(darwin.saveData.questions[answerID].times[i])
  }

  //calculate average value
  return Math.round(sum / darwin.saveData.questions[answerID].times.length)
}

/**
 * Adjust the page title
 */
darwin.adjustPageTitle = function (title) {
  jQuery('.page_title').text(title)
}

/**
 * Show the next question
 */
darwin.nextQuestion = function () {
  if (darwin.questionSelected) {
    // get the timer
    if (darwin.activeTimer) {
      darwin.currentAnswer.answerTime = darwin.currentSeconds
      clearInterval(darwin.activeTimer)
    }

    // create a new object for this answer
    darwin.currentAnswer.selectedAnswer = jQuery('#openAnswer').val()

    // push the answer
    darwin.currentAnswer.questionData =
      darwin.questions[darwin.currentQuestionIndex]
    darwin.currentAnswer.questionID = darwin.currentQuestionIndex

    darwin.savedAnswers.push(darwin.currentAnswer)
    darwin.currentQuestionIndex++

    // change the button text when we are at the last question
    if (darwin.currentQuestionIndex + 1 === darwin.totalQuestions) {
      jQuery('#nextQuestionButton a').text('Finish')
    }

    // show the final screen when we the user has answered the last question
    if (darwin.currentQuestionIndex === darwin.totalQuestions) {
      darwin.generateFinishScreen()
    } else {
      darwin.generateQuestion()
    }

    jQuery('#openAnswer').val('')
  }
}

/**
 * Stopwatch
 */
darwin.updateClock = function () {
  darwin.currentSeconds++
  darwin.currentSeconds =
    (darwin.currentSeconds < 10 ? '' : '') + darwin.currentSeconds
}

/**
 * Restart the questions
 */
darwin.printResult = function () {
  window.print()
}

/**
 * Print the results
 */
darwin.restart = function () {
  jQuery('#welcomePanel').show()
  jQuery('#resultsContainer').hide()
  jQuery('#resultsInfo').hide()
  jQuery('#introductionPage').show()
  jQuery('#resultsIntroduction').hide()
  jQuery('#emotionsExperiment').insertAfter('#introductionContent')
  jQuery('#startButtonContainer').show()
  jQuery('.content_sidebar').show()
  jQuery('.content_content_sidebar').css({
    width: '640px',
  })
}

/**
 * Skip the game
 */
darwin.skipGame = function () {
  jQuery('#emotionsExperiment').insertBefore('#introductionPage')
  jQuery('#welcomePanel').hide()
  jQuery('#resultsContainer').show()
  jQuery('#resultsContent').show()
  jQuery('#introductionPage').hide()
  jQuery('.content_sidebar').hide()
  jQuery('.content_content_sidebar').css({
    width: '936px',
  })

  // generate results
  jQuery(darwin.questions).each(function (resultIndex, resultObject) {
    var clone = jQuery('.dummyResultBox')
      .first()
      .clone()
      .appendTo('#resultsContainer')
      .removeClass('dummyResultBox')
      .attr('data-id', resultIndex)
      .addClass('generatedResult')

    // the users answer + time
    var answerTime = darwin.getTimeStamp(resultObject.answerTime)

    // thumb
    jQuery('.resultThunbnail img', clone).attr(
      'src',
      darwin.config.imagePath + resultObject.thumb_url,
    )
    /*jQuery('.resultThunbnail a', clone).attr('href', darwin.config.imagePath + resultObject.image_url).lightBox({
     txtImage: 'Emotion',
     txtOf: '/'
     }); */

    jQuery(clone).find('.anLink').attr('href', resultObject.diagram)

    // title
    jQuery('h2', clone).text(resultObject.title)

    // darwin's choice
    jQuery('.resultChoice span', clone).append(resultObject.darwin_choice)

    // average time
    jQuery('.resultTime span', clone).append(
      resultObject.averagetime + ' seconds',
    )

    var info = resultObject.duchene
    info = info.replace(/'/g, '"')
    jQuery('.ducheneResult', clone).append(info)

    info = resultObject.darwin
    info = info.replace(/'/g, '"')
    jQuery('.darwinResult', clone).append(info)

    jQuery('.moreInfoResult', clone).append(resultObject.info)
    jQuery('.moreInfoLink', clone).click(function () {
      var infoContainer = jQuery('.moreInfoResult', clone)

      if (jQuery(infoContainer).is(':visible')) {
        jQuery(this).text("See what Darwin's visitors thought")
        jQuery(infoContainer).slideUp()
      } else {
        jQuery(this).text("Hide what Darwin's visitors thought")
        jQuery(infoContainer).slideDown()
      }
    })

    jQuery('.resultLinks', clone).css('margin-top', '20px')

    // the related letters option
    jQuery('.duchenneLink', clone).click(function () {
      var infoContainer = jQuery('.ducheneResult', clone)

      if (jQuery(infoContainer).is(':visible')) {
        jQuery(this).text('What Duchenne said...')
        jQuery(infoContainer).slideUp()
      } else {
        jQuery(this).text('Hide what Duchenne said...')
        jQuery(infoContainer).slideDown()
      }
    })

    jQuery('.darwinLink', clone).click(function () {
      var infoContainer = jQuery('.darwinResult', clone)

      if (jQuery(infoContainer).is(':visible')) {
        jQuery(this).text('What Darwin said...')
        jQuery(infoContainer).slideUp()
      } else {
        jQuery(this).text('Hide what Darwin said...')
        jQuery(infoContainer).slideDown()
      }
    })

    if (resultObject.video !== '') {
      jQuery('.resultLinks', clone).css('margin-top', '10px')
      jQuery('.videoLink', clone).click(function () {
        var infoContainer = jQuery('.videoContainer', clone)

        if (jQuery(infoContainer).is(':visible')) {
          jQuery(this).text('Watch a video ..')
          jQuery(infoContainer).slideUp()

          darwin.closeVideo(jQuery('.videoContainer', clone))
        } else {
          jQuery(this).text('Hide video...')
          jQuery(infoContainer).slideDown()

          darwin.showVideo(jQuery('.videoContainer', clone), resultObject)
        }
      })
    } else {
      jQuery('.videoLink', clone).hide()
    }

    if (resultIndex === 7) {
      jQuery('.darwinLink').last().hide()
    }

    if (resultIndex === 3) {
      jQuery('.darwinLink').last().hide()
    }
  })

  jQuery('#resultsContainer').append(jQuery('#darwinResults'))
  jQuery('#resultsContainer').append(jQuery('#referencesBox'))
  jQuery('#resultsContainer').show()

  // set the title
  darwin.adjustPageTitle("Darwin's Conclusion")

  jQuery('.videoLink').text('Watch a video...')
  jQuery('.duchenneLink').text('What Duchenne said...')
  jQuery('.darwinLink').text('What Darwin said...')
  jQuery('.moreInfoLink').text("What Darwin's visitors thought...")
  jQuery('.videoContainer').hide()
  jQuery('.darwinResult').hide()
  jQuery('.ducheneResult').hide()
  jQuery('.moreInfoResult').hide()
  jQuery('.resultGuess').hide()
  jQuery('#startButtonContainer').hide()
  jQuery('#resultsContent').show()
  jQuery('#resultsIntroduction').insertBefore('#emotionsExperiment').show()
  jQuery('#resultsInfo').show().insertAfter('#emotionsExperiment')
}

/**
 * Wire UI elements and buttons
 */
darwin.wire = function () {
  darwin.progessBar = jQuery('#progressbar').progressbar({
    value: 50,
  })

  // bind the startbutton
  jQuery('#startButton').bind('click', function (e) {
    darwin.startGame()
  })

  // bind the nextQuestionButton
  jQuery('#nextQuestionButton').bind('click', function (e) {
    darwin.nextQuestion()
  })

  // bind the printButton
  jQuery('#printButton').click(function () {
    darwin.printResult()
  })

  // bind the restartButton
  jQuery('#restartButton').click(function () {
    darwin.restart()
    jQuery('.page_title').text('Welcome to Darwin Emotions')
    jQuery('#introductionPage').show()
  })

  // bind the skipButton
  jQuery('#skipButton').click(function () {
    darwin.skipGame()
  })

  // bind the enter key
  jQuery('body, input, textarea').keypress(function (e) {
    if (e.which === 13 && darwin.questionSelected === true) {
      /// get the current screen
      if (jQuery('#welcomePanel').is(':visible')) {
        darwin.startGame()
      } else if (jQuery('#questionPanel').is(':visible')) {
        jQuery('#nextQuestionButton').click()
      }
    }
  })

  // relocate divs
  jQuery('#emotionsExperiment').insertAfter('#introductionContent')
}

/**
 * Saving
 */
darwin.saveDataOnServer = function (callback) {
  var dataToSend = {
    addSlashes: darwin.config.addSlashes,
    dataFileName: darwin.config.saveDataFile,
  }

  var payload = darwin.saveData
  dataToSend.payload = darwin.saveData

  jQuery.ajax({
    url: darwin.config.saveServiceDataPath,
    type: 'POST',
    data: dataToSend,
    error: function (jqXHR, textStatus, errorThrown) {
      // Whine
      // Callback with error
      if (typeof callback === 'function') {
        callback(false)
      }
    },
    success: function (response, textStatus, jqXHR) {
      if (response.haserror || response.results === null) {
        var msg_title = 'Save error:'
        var msg = 'Error: ' + response.errors

        if (typeof callback === 'function') {
          callback(false)
        }
      } else {
        if (typeof callback === 'function') {
          callback(true)
        }
      }
    },
  })
}

darwin.closeVideo = function (container) {}

/********************/

var dcpadvancedsearch = window.dcpadvancedsearch || {}
var Autosuggestion = function (options) {
  /*
   * TODO
   *
   * Input highlight search is still case sensitive
   * // Ajax calls to perform the search
   * // Some code in keyUp input hander has to be executed even if the input contains more/less than 3 characters
   * highlighting serverside
   * // what if no results found
   * // loading state change timer before exectugin ajax call (solve flickering)
   * /=/ what if user wants to hide the autosuggestion (using other elements on the site than the search input)
   * //if user stops typing, show the autosuggestion box
   *
   * testing
   */

  /*
   * ISSUES
   *
   * strange characters input ajax error (html escape)
   */

  var self = this

  //default settings
  var started = false
  //default settings in options object
  self.options = {}
  self.options.emptyCatergoryDefaultsToLoadingState = false
  self.options.wrappingElementSelector = 'body'
  self.options.numberOfInputCharactersToStartSuggesting = 3

  // overwrite properties defined in data (object format)
  if (options) {
    for (var item in options) {
      self.options[item] = options[item]
    }
  }

  this.fillcategory = function (category) {
    var categoryHTML = ''
    var searchurl = jQuery('#advancedSearchbutton').attr('href')
    if (!(category.visible === false)) {
      var itemsHTML = ''
      var loading = false
      var noResults = false
      if (!category.items || category.items.length <= 0) {
        noResults = true
        itemsHTML = '<li>No results found</li>'
      } else {
        jQuery.each(category.items, function () {
          var item = this

          /* Highlighting code => should he handled serverside */

          if (self.options.inputFieldSelector) {
            item.name = item.name.replace('<span>', '')
            item.name = item.name.replace('</span>', '')
            item.name = item.name.replace(
              jQuery(self.options.inputFieldSelector).attr('value'),
              '<span>' +
                jQuery(self.options.inputFieldSelector).attr('value') +
                '</span>',
            )
          }

          itemsHTML +=
            '<li class="singleResult">' +
            '<a href="' +
            item.link +
            '">' +
            item.name +
            '</a>' +
            '</li>'
        })
      }
      var headingHTML

      if (category.iconURL) {
        headingHTML =
          '<h3 class="autosuggestionHasBackground" style="background-image: url(' +
          jQuery('#dcpastheme').text() +
          '/images/' +
          category.iconURL +
          '.gif);">' +
          category.name +
          '</h3>'
      } else {
        headingHTML = '<h3>' + category.name + '</h3>'
      }

      categoryHTML +=
        '<li id="' +
        category.name +
        '">' +
        '<div class="searchAutoSuggestionCatergoryHead">' +
        headingHTML +
        '<a href="' +
        searchurl +
        category.searchForCategoryLink +
        '">' +
        'View all results for ' +
        category.name +
        ' (' +
        (category.numFound ? category.numFound : '0') +
        ')' +
        '</a>' +
        '</div>'

      if (loading) {
        categoryHTML +=
          '<ul class="searchAutoSuggestionCatergoryItems loading">' +
          itemsHTML +
          '</ul>' +
          '</li>'
      } else if (noResults) {
        categoryHTML +=
          '<ul class="searchAutoSuggestionCatergoryItems noResults">' +
          itemsHTML +
          '</ul>' +
          '</li>'
      } else {
        categoryHTML +=
          '<ul class="searchAutoSuggestionCatergoryItems">' +
          itemsHTML +
          '</ul>' +
          '</li>'
      }
      jQuery('li#' + category.name).html(categoryHTML)
    }
  }
  // update the html
  this.refresh = function (dcpas) {
    var categoryHTML = ''
    var searchurl = jQuery('#advancedSearchbutton').attr('href')
    if (dcpas) {
      dcpadvancedsearch = dcpas
    }
    jQuery.each(self.options.categories, function () {
      var category = this

      if (!(category.visible === false)) {
        var itemsHTML = ''
        var loading = false
        var noResults = false

        if (
          category.loading ||
          (self.options.emptyCatergoryDefaultsToLoadingState === true &&
            (!category.items || category.items.length <= 0))
        ) {
          loading = true
          itemsHTML = '<li>Loading...</li>'
        } else if (!category.items || category.items.length <= 0) {
          noResults = true
          itemsHTML = '<li>No results found</li>'
        } else {
          jQuery.each(category.items, function () {
            var item = this

            /* Highlighting code => should he handled serverside */

            if (self.options.inputFieldSelector) {
              item.name = item.name.replace('<span>', '')
              item.name = item.name.replace('</span>', '')
              item.name = item.name.replace(
                jQuery(self.options.inputFieldSelector).attr('value'),
                '<span>' +
                  jQuery(self.options.inputFieldSelector).attr('value') +
                  '</span>',
              )
            }

            itemsHTML +=
              '<li class="singleResult">' +
              '<a href="' +
              item.link +
              '">' +
              item.name +
              '</a>' +
              '</li>'
          })
        }

        /* if(!category.loading && category.items && category.items.length > 0)
         {

         }
         else if(self.options.emptyCatergoryDefaultsToLoadingState === true || category.loading) {

         }
         else {

         }*/

        var headingHTML

        if (category.iconURL) {
          headingHTML =
            '<h3 class="autosuggestionHasBackground" style="background-image: url(' +
            jQuery('#dcpastheme').text() +
            '/images/' +
            category.iconURL +
            '.gif);">' +
            category.name +
            '</h3>'
        } else {
          headingHTML = '<h3>' + category.name + '</h3>'
        }
        categoryHTML +=
          '<li id="' +
          category.name +
          '">' +
          '<div class="searchAutoSuggestionCatergoryHead">' +
          headingHTML +
          '<a href="' +
          searchurl +
          category.searchForCategoryLink +
          '">' +
          'View all results for ' +
          category.name +
          ' (' +
          (category.numFound ? category.numFound : '0') +
          ')' +
          '</a>' +
          '</div>'

        if (loading) {
          categoryHTML +=
            '<ul class="searchAutoSuggestionCatergoryItems loading">' +
            itemsHTML +
            '</ul>' +
            '</li>'
        } else if (noResults) {
          categoryHTML +=
            '<ul class="searchAutoSuggestionCatergoryItems noResults">' +
            itemsHTML +
            '</ul>' +
            '</li>'
        } else {
          categoryHTML +=
            '<ul class="searchAutoSuggestionCatergoryItems">' +
            itemsHTML +
            '</ul>' +
            '</li>'
        }
      }
    })

    if (self.options.addedHTML) {
      categoryHTML += self.options.addedHTML
    }

    $ULWrap.empty().append(categoryHTML)
  }

  // add category to the current categories array
  this.addCategory = function (category) {
    if (!category.items) category.items = []
    self.options.categories.push(category)
  }

  // set categories (array)
  this.setCategories = function (categories) {
    self.options.categories = []
    if (categories) {
      jQuery.each(categories, function (index, category) {
        self.addCategory(category)
      })
    }
  }

  // add item (object literal format) to category
  this.addItem = function (categoryName, item) {
    jQuery.each(self.options.categories, function () {
      if (this.name == categoryName) {
        this.items.push(item)
      }
    })
  }

  // set the items (array with object in object literal format) for a category
  this.setItems = function (categoryName, items) {
    jQuery.each(self.options.categories, function () {
      if (this.name == categoryName) {
        this.items = items
      }
    })
  }

  // update category with changes in object literal format
  this.updateCategory = function (categoryName, changes) {
    jQuery.each(self.options.categories, function () {
      if (this.name == categoryName) {
        for (var item in changes) {
          this[item] = changes[item]
        }
      }
    })
  }

  //replace all the categories with the provided object
  this.resetCategories = function (categories) {
    self.options.categories = categories
  }
  // update all categories with provided changes (object)
  this.updateAllCategories = function (changes) {
    jQuery.each(self.options.categories, function () {
      for (var property in changes) {
        this[property] = changes[property]
      }
    })
  }

  this.setNumFound = function (categoryName, numFound) {
    jQuery.each(self.options.categories, function () {
      if (this.name === categoryName) {
        this.numFound = numFound
      }
    })
  }
  /**
   *  borrowed from facetsolr search - need to be using it directly rather than duplicating the code
   */
  this.exactPhraseSearching = function (keyword, defaulturl) {
    var exactphrases = []
    var singlewords = []
    //is this a phrase search - surrounded by "
    //count "'s - if it is an even number split and make seperate searches
    var leng = (keyword.match(/"/g) || []).length
    if (leng % 2 == 0) {
      //we have matched pairs
      exactphrases = keyword.match(/"([^"]*)"/g)
      keyword = keyword.replace(/("[^"]*")/g, '')
    } else {
      //ignore as I am not sure what is happening...
    }
    //else split on spaces
    singlewords = keyword.split(' ')

    //exact phrases = :"phrase thing"
    //single words = :*[keyword]*
    //single words = :[keyword]

    //foreach match do 4 things...
    //letdata_transcription_text_en:"phrase thing" or letdata_transcription_text_en:*[keyword]* or letdata_transcription_text_en:[keyword]

    var regExp = new RegExp('\\[keyword\\]', 'g')
    var parts = defaulturl.match(/([^ ]*:\[keyword\][^ )]*)/g)
    if (parts == null) {
      return defaulturl.replace(regExp, keyword)
    }
    for (var part = 0; part < parts.length; part++) {
      var temppart = parts[part]
      if (parts[part] && parts[part] != '' && typeof temppart === 'string') {
        var bits = []
        if (exactphrases) {
          for (var exact = 0; exact < exactphrases.length; exact++) {
            var a = temppart.replace(regExp, exactphrases[exact])
            bits.push(a)
          }
        }
        if (singlewords) {
          for (var single = 0; single < singlewords.length; single++) {
            if (singlewords[single] && singlewords[single] != '') {
              var stuff = []
              var repl = singlewords[single].toLowerCase()
              var a = temppart.replace(regExp, repl)
              stuff.push(a)
              var b = temppart.replace(regExp, '*' + repl + '*')
              stuff.push(b)

              var simplephrase = stuff.join(' OR ')
              if (stuff.length > 1) {
                simplephrase = '(' + simplephrase + ')'
              }
              bits.push(simplephrase)
            }
          }
        }
        var simplephrase = bits.join(' AND ')
        if (bits.length > 1) {
          simplephrase = '(' + simplephrase + ')'
        }
        defaulturl = defaulturl.replace(temppart, simplephrase)
      }
    }
    return defaulturl
  }
  //perform search for every category
  this.performSearch = function () {
    var autoSug = this
    jQuery.each(self.options.categories, function () {
      var category = this

      //if(!(category.visible === false) && category.itemsNameLocation && category.buildItemsLinkLocation)
      if (!(category.visible === false) && category.itemsNameLocation) {
        // timer to update the category to the loading state by refreshing the html
        // doesn't need to be executed if the call takes less than 1sec to complete
        // if executed every time, content flickers
        //var timer = setTimeout(function(){
        //    category.loading = true;
        //    self.refresh();
        // }, 1000);

        //timer = setTimeout(self.refresh(), 500);
        //self.refresh();
        var keyword = jQuery(self.options.inputFieldSelector).attr('value')
        var queryURL = autoSug.buildSolrBaseUrl(category)

        queryURL += autoSug.doKeywordsearch(
          keyword,
          category.documentTypeSelect,
          category.defaultURL,
        )
        var data = {}
        data.pagination = {}
        data.pagination.currentPage = 1
        data.pagination.itemsPerPage = 5
        data.sortValue = category.sortname
        queryURL += autoSug.buildSolrPagination(data, category) //these 3 should be last
        queryURL += autoSug.buildSolrSort(data, category) //these 3 should be last
        queryURL += autoSug.buildSolrExtra(data, category) //these 3 should be last
        queryURL = queryURL.replace(/([^:])\/\//g, '$1/')
        jQuery(
          'li#' + category.name + '> ul.searchAutoSuggestionCatergoryItems',
        ).addClass('loading')
        jQuery(
          'li#' + category.name + '> ul.searchAutoSuggestionCatergoryItems',
        ).html('<li>Loading...</li>')
        //var queryURL = category.queryURL.replace(/#searchterm#/g, encodeURIComponent(jQuery(self.options.inputFieldSelector).attr('value').toLowerCase()));
        jQuery.ajax({
          url: queryURL,
          dataType: 'json',
          success: function (result, textStatus, jqXHR) {
            self.setItems(category.name, []) //initialise items
            self.setNumFound(category.name, 0)
            if (result.haserror || !result || !result.response) {
              if (result.haserror) {
                var msg_title = 'Retrieval error:'
                var msg = 'Error: ' + result.errors
                autoSug.growl(msg_title, msg)
                if (typeof callback === 'function') {
                  callback(false, result)
                }
              }
            } else {
              // if ajax call is successfully loaded stop the timer from finishing/executing
              //clearTimeout(timer);
              var items = result

              if (category.itemsLocationInResult) {
                var itemsObjectSelector =
                  category.itemsLocationInResult.split('.')

                for (var selector in itemsObjectSelector) {
                  items = items[itemsObjectSelector[selector]]
                }
              }

              if (items) {
                var itemsInRightFormat = []
                for (var i in items) {
                  var item = items[i]
                  var itemInRightFormat = {}

                  var itemsNameSelector = category.itemsNameLocation.split('.')
                  var itemName = ''
                  for (var selector in itemsNameSelector) {
                    var separated = itemsNameSelector[selector].split(',')
                    jQuery.each(separated, function (index, chunk) {
                      if (
                        item[jQuery.trim(chunk)] &&
                        item[jQuery.trim(chunk)] != ''
                      ) {
                        // `chunk` is each member of the array.
                        if (itemName == '') {
                          itemName = item[chunk]
                        }
                        return false //break out of loop as have data
                      }
                      return true
                    })
                    //itemName = item[itemsNameSelector[selector]];
                  }

                  itemInRightFormat.name = itemName
                  itemInRightFormat.link =
                    dcpadvancedsearch.config.site +
                    '' +
                    item.id_ident_required.replace(
                      dcpadvancedsearch.config.solrprefix +
                        category.searchidmatch,
                      category.searchidreplace,
                    )

                  itemsInRightFormat.push(itemInRightFormat)
                }

                self.setItems(category.name, itemsInRightFormat)
              }
              self.setNumFound(category.name, result.response.numFound)
            }
            category.loading = false
            self.fillcategory(category)
            //self.refresh();
          },
          error: function (jaXHR, textStatus) {
            //console.log('Ajax error in Autosuggestion.js: '+textStatus);
            console.log(jaXHR)
            self.setItems(category.name, [])
            self.setNumFound(category.name, 0)
            self.fillcategory(category)
          },
        })
      }
    })
  }

  // General messaging function
  this.growl = function (msg_title, msg, ttl) {
    var time = ttl || 5000

    if (!msg) {
      msg = 'missing msg'
    }

    if (!msg_title) {
      msg_title = 'missing title'
    }

    jQuery.gritter.add({
      title: msg_title,
      text: msg,
      time: time,
    })
  }

  /**
   *  from facetSolrsearch =- needs to integrate better
   */
  this.buildSolrPagination = function (datum, category) {
    datum.pagination.offset =
      datum.pagination.itemsPerPage * (datum.pagination.currentPage - 1)
    var pagination = category.formExtraParams
      .replace('[rows]', datum.pagination.itemsPerPage)
      .replace('[offset]', datum.pagination.offset)
    if (category.customPaginationParams) {
      //TODO used by website search - need to work out best way to do this...
      //    pagination = data.searchIn[data.searchtypes].customPaginationParams(data.pagination.itemsPerPage, data.pagination.offset);
    }
    return pagination
  }

  /**
   *  from facetSolrsearch =- needs to integrate better
   */
  this.buildSolrExtra = function (data, category) {
    var extra = ''
    if (category.facet) {
      extra += category.enableFacets
      var temp = category.facet

      for (var facetField in temp) {
        if (
          temp[facetField] &&
          temp[facetField].field &&
          temp[facetField].active === true
        ) {
          extra += '&facet.field[]=' + temp[facetField].field
        }
      }
    }
    return extra
  }

  /**
   *  from facetSolrsearch =- needs to integrate better
   */
  this.buildSolrSort = function (data, category) {
    if (data.sortValue) {
      var sortdatum = category.sort
      for (var i in sortdatum) {
        if (sortdatum[i].name == data.sortValue) {
          return (
            category.sortParam +
            sortdatum[i].field +
            ' ' +
            sortdatum[i].direction
          )
        }
      }
    }
    return ''
  }

  /**
   *  from facetSolrsearch =- needs to integrate better
   */
  this.buildSolrBaseUrl = function (category) {
    var baseURL = category.baseQueryURL
    if (
      category.baseQueryParams !== 'undefined' &&
      category.baseQueryParams !== ''
    ) {
      baseURL += category.baseQueryParams
    }
    if (
      category.customBaseQueryURL !== 'undefined' &&
      category.customBaseQueryURL !== ''
    ) {
      baseURL = category.customBaseQueryURL
    }
    if (window.location.protocol == 'https:') {
      baseURL = baseURL.replace(/http:/, 'https:')
    } else {
      baseURL = baseURL.replace(/https:/, 'http:')
    }
    return baseURL
  }
  /**
   *  from facetSolrsearch =- needs to integrate better
   */
  this.doKeywordsearch = function (keyword, documentTypeSelect, defaultURL) {
    //perform a regular search using the value of the input field
    var localSelection = ''
    var doescaping = false
    if (typeof documentTypeSelect !== 'undefined' && documentTypeSelect != '') {
      localSelection += eval(documentTypeSelect) + ' '
      doescaping = true
    }

    var origurl = eval(defaultURL)
    var defaulturl = this.exactPhraseSearching(keyword, origurl)

    if (doescaping) {
      localSelection += this.escapeUserInput(defaulturl)
      selection = localSelection
    } else {
      selection = defaulturl
    }
    return selection
  }

  /**
   * from facet solr search
   * function that removes unwanted characters from the query
   */
  this.escapeUserInput = function (input) {
    return encodeURIComponent(
      escape(
        input
          .replace('[', '')
          .replace('&', '&amp;')
          .replace(']', '')
          .replace('{', '')
          .replace('}', '')
          .replace('Ã', ' '),
      ),
    )

    //return encodeURI(input.replace('[', '').replace(']', '').replace('{', '').replace('}', '').replace(',', ' ').replace('Ã', ' '));
  }

  this.init = function () {
    started = true
    //self.updateAllCategories({loading: true});
    self.performSearch()
    $ULWrap.show('fast')

    /*
     * Might not be the behaviour we want
     */
    $ULWrap.click(function (e) {
      var stopPropagation = true

      if (self.options.allowClickForItemsSelector) {
        if (jQuery(e.target).is(self.options.allowClickForItemsSelector)) {
          stopPropagation = false
        }
      }

      if (jQuery(e.target).is('li.singleResult')) {
        //jQuery(e.target).find('a').trigger('click');
        window.location = jQuery(e.target).find('a').attr('href')
        stopPropagation = false
      }

      if (stopPropagation) {
        e.stopPropagation()
      }
    })

    jQuery(self.options.inputFieldSelector).click(function (e) {
      e.stopPropagation()
    })

    jQuery('body').click(function () {
      started = false
      $ULWrap.hide('fast')
    })
  }

  /* execute code */
  //	if(jQuery(self.options.wrappingElementSelector)){
  self.options.wrappingElementSelector = '.top_search'
  jQuery(self.options.wrappingElementSelector).append(
    '<ul class="searchAutoSuggestion"></ul>',
  )
  var $ULWrap = jQuery(
    self.options.wrappingElementSelector + ' .searchAutoSuggestion:last-child',
  )

  jQuery('ul.searchAutoSuggestion li ul li.singleResult').live(
    'hover',
    function () {
      jQuery('ul.searchAutoSuggestion li ul li').removeClass('active')
      jQuery(this).addClass('active')
    },
  )

  if (self.options.inputFieldSelector) {
    var keyUpTimer

    jQuery(self.options.inputFieldSelector).keydown(function (e) {
      if (started) {
        if (e.keyCode == 40 || e.keyCode == 9) {
          //down

          if (e.keyCode == 9) {
            e.stopPropagation()
          }

          if ($ULWrap.find('li.active').length <= 0) {
            jQuery($ULWrap.find('li.singleResult')[0]).addClass('active')
          } else {
            var currentActiveElement = $ULWrap.find('li.singleResult.active')[0]
            var currentElements = jQuery('li.singleResult')

            var currentActiveElementIndex =
              currentElements.index(currentActiveElement)

            if (currentElements[currentActiveElementIndex + 1]) {
              jQuery(currentActiveElement).removeClass('active')
              jQuery(currentElements[currentActiveElementIndex + 1]).addClass(
                'active',
              )
            } else {
              jQuery(currentActiveElement).removeClass('active')
              jQuery(currentElements[0]).addClass('active')
            }
          }
          return false
        } else if (e.keyCode == 38) {
          //up

          if ($ULWrap.find('li.active').length <= 0) {
            jQuery(
              $ULWrap.find('li.singleResult')[
                $ULWrap.find('li.singleResult').length - 1
              ],
            ).addClass('active')
          } else {
            var currentActiveElement = $ULWrap.find('li.singleResult.active')[0]
            var currentElements = jQuery('li.singleResult')

            var currentActiveElementIndex =
              currentElements.index(currentActiveElement)

            if (currentElements[currentActiveElementIndex - 1]) {
              jQuery(currentActiveElement).removeClass('active')
              jQuery(currentElements[currentActiveElementIndex - 1]).addClass(
                'active',
              )
            } else {
              jQuery(currentActiveElement).removeClass('active')
              jQuery(currentElements[currentElements.length - 1]).addClass(
                'active',
              )
            }
          }
        } else if (e.keyCode == 13) {
          //return
          if ($ULWrap.find('li.singleResult.active a').length > 0) {
            console.log('found selected result')
            window.location = $ULWrap
              .find('li.singleResult.active a')
              .attr('href')
            return false
          }
        } else {
          self.performSearch()
        }
      } else {
        var input = this
        clearTimeout(keyUpTimer)
        keyUpTimer = setTimeout(function () {
          if (jQuery(input).attr('value').length > 0) {
            self.init()
          }
        }, 500)

        if (
          jQuery(input).attr('value').length >=
          self.options.numberOfInputCharactersToStartSuggesting
        ) {
          self.init()
        }
      }
    })
  }
}

/**********************/
