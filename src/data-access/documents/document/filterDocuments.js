'use server';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';

const buildQuery = (products, origin, sampleTypes, documentTypes) => {
  const query = { documentStatus: 'published' };

  if (products.length > 0) {
    query['header.product'] = { $in: products };
  }

  if (origin.length > 0) {
    query['header.origin'] = { $in: origin };
  }

  if (sampleTypes.length > 0) {
    query['header.sampleType'] = {
      $in: sampleTypes,
    };
  }

  if (documentTypes.length > 0) {
    query['header.documentType'] = {
      $in: documentTypes,
    };
  }

  return query;
};

export async function filterDocuments(filter, sorted) {
  const { products, sampleTypes, documentTypes, origin } = filter;

  try {
    await dbConnect();

    const query = buildQuery(products, origin, sampleTypes, documentTypes);
    let pipeline = [{ $match: query }];
    if (sorted) {
      pipeline.push(
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            documents: { $push: '$$ROOT' },
          },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            documents: 1,
          },
        },
        {
          $sort: { date: -1 },
        }
      );
    } else {
      pipeline.push({
        $sort: { createdAt: -1 },
      });
    }
    const documents = await Document.aggregate(pipeline);
    return {
      documents: JSON.stringify(documents),
    };
  } catch (error) {
    console.log('Failed to find documents in database. error:', error);
    throw Error('Could not find documents in database: ' + error);
  }
}
